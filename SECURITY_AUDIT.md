# Auditoría de seguridad — Patitas Peludas

**Fecha:** 2026-10-17 · **Alcance:** `index.html` (Sistema de Gestión + Firebase Firestore) y `owen-repaso/`
**Realizada por:** agente `patitas-guardian-seguridad` (`.claude/agents/patitas-guardian-seguridad.md`)
**Pruebas automatizadas:** `npm test` → 18 pruebas: **10 OK, 8 fallan** (cada fallo es un hallazgo confirmado).

## Veredicto de lanzamiento: ❌ NO LISTO

La app funciona, pero hoy **la seguridad depende de que nadie mire el código fuente**. Cualquier
persona que abra la página puede ver las contraseñas de admin y vendedor, o entrar sin ellas
escribiendo una línea en la consola del navegador. Antes de lanzar hay que resolver PP-01 a PP-03.

## Hallazgos

| ID | Severidad | OWASP | Evidencia | Impacto en el negocio | Prueba |
|----|-----------|-------|-----------|------------------------|--------|
| PP-01 | 🔴 Crítica | A07 Autenticación | `index.html:282-285` objeto `USERS` con contraseñas en texto plano; `doLogin()` compara en el navegador | Cualquiera ve las claves con "Ver código fuente" (Ctrl+U). Están además en el historial público de git desde `ef5d11e`. | `autenticacion › no hay contraseñas…`, `› usa Firebase Authentication` |
| PP-02 | 🔴 Crítica | A01 Control de acceso | `index.html:343` restaura sesión con `sessionStorage.getItem('pp_user')` | `sessionStorage.setItem('pp_user','admin')` + recargar = acceso de administrador sin contraseña. | `autenticacion › la sesión no se restaura…` |
| PP-03 | 🔴 Crítica | A01 / A04 | No hay `firestore.rules` versionado; la app no usa Firebase Auth. Lectura anónima por REST hoy responde **403**. | Si las reglas están abiertas al SDK, cualquiera con la config pública puede leer/borrar ventas, compras y gastos. Si están cerradas, la app no puede guardar datos. **Hay que confirmar en la consola cuál es el caso.** Sin respaldos, un borrado es definitivo. | `firestore › …` (se agregó `firestore.rules` propuesto) |
| PP-04 | 🟠 Alta | A01 | Roles `admin`/`vendedor` solo cambian la etiqueta del menú | El vendedor puede borrar ventas, editar compras y ver toda la contabilidad. | cubierto por `firestore.rules` propuesto |
| PP-05 | 🟠 Alta | A03 XSS almacenado | 20 interpolaciones sin `san()`: p. ej. `index.html:1950` `${r.p}`, `:2094`, `:2259` `${provVal}`, `:2290` `${concepto}`, `:2391` `value="${item.p}"`, `:1634` `${err.message}` | Un nombre de producto/proveedor/concepto con `<img src=x onerror=…>` ejecuta código en el navegador de todos los usuarios (robo de sesión, borrado masivo desde dentro). | `xss › ningún dato de Firestore/usuario…` |
| PP-06 | 🟡 Media | A08 Integridad | Chart.js, jsPDF, autotable y xlsx desde cdnjs **sin `integrity`**; Firebase por `import` sin SRI | Si el CDN es comprometido, se ejecuta código ajeno con acceso a todos los datos. | `cadena-suministro › …SRI` |
| PP-07 | 🟡 Media | A05 Configuración | Sin `Content-Security-Policy` en `index.html` ni `owen-repaso/index.html` | Sin CSP, cualquier XSS puede cargar scripts de cualquier dominio y enviar datos fuera. | `cadena-suministro › define CSP` |
| PP-08 | 🟡 Media | A08 | `xlsx 0.18.5` de cdnjs tiene vulnerabilidades conocidas (CVE-2023-30533 prototype pollution, CVE-2024-22363 ReDoS) y SheetJS ya no publica en npm/cdnjs | Abrir un Excel malicioso puede afectar la app. | manual |
| PP-09 | 🔵 Baja | A03 | `owen-repaso/js/app.js:69` `esc()` no escapa comillas y se usa en `value="…"` (`:216`) | Solo afecta al propio dispositivo (dato en localStorage), pero conviene cerrarlo. | `xss › esc() …` |
| PP-10 | 🔵 Baja | Privacidad | `owen-repaso` guarda el correo de un adulto en localStorage | Dato personal ligado a un menor; ofrecer "borrar perfil" y aviso de privacidad. | manual |

Lo que **está bien**: `san()` escapa correctamente (incluidas comillas), no hay `eval`/`document.write`,
no hay claves privadas ni cuentas de servicio en el repo, versiones de librerías fijadas, la API key de
Firebase es pública por diseño (pero debe restringirse, ver abajo).

## Plan de remediación (en orden)

### Fase 1 — antes del lanzamiento (bloqueante)
1. **Migrar el login a Firebase Authentication** (correo + contraseña):
   - Consola Firebase → Authentication → habilitar *Email/Password* → crear un usuario por empleado.
   - En Firestore crear `usuarios/{uid}` con `{ rol: 'admin' | 'vendedor', activo: true }`.
   - En `index.html`: borrar el objeto `USERS`, usar `signInWithEmailAndPassword` y `onAuthStateChanged`
     (reemplaza la restauración por `sessionStorage`).
2. **Desplegar `firestore.rules`** (ya en el repo) *después* del paso 1: `firebase deploy --only firestore:rules`.
   Probarlo antes en el *Rules Playground* de la consola.
3. **Cambiar ya** las contraseñas actuales: aunque se borren del código, siguen en el historial público.
4. **Escapar con `san()`** todas las interpolaciones que marca la prueba XSS (o usar `textContent`).

### Fase 2 — protección de datos y continuidad (primera semana)
5. **Respaldos automáticos** (lo más importante para "no perder el trabajo"):
   - Activar *Point-in-time recovery* (7 días) y *delete protection* de la base:
     `gcloud firestore databases update --database='(default)' --enable-pitr --delete-protection`
   - Export diario a Cloud Storage: `gcloud firestore export gs://patitas-backups/$(date +%F)`
     programado con Cloud Scheduler, con regla de retención de 30–90 días en el bucket.
   - Mensualmente, descargar un Excel desde la app y guardarlo fuera de Google.
6. **Restringir la API key** (Google Cloud → APIs y servicios → Credenciales): referrers HTTP solo
   del dominio de GitHub Pages; y activar **Firebase App Check** (reCAPTCHA Enterprise).
7. **GitHub**: activar 2FA en la cuenta, proteger la rama `main` (requerir PR y el check
   *Pruebas de seguridad*), y mantener un clon del repo en otro lugar.

### Fase 3 — endurecimiento
8. Añadir `integrity` + `crossorigin` a los scripts de cdnjs y un `<meta http-equiv="Content-Security-Policy">`.
9. Reemplazar `xlsx 0.18.5` por la versión oficial actual de SheetJS (cdn.sheetjs.com) autoalojada.
10. `owen-repaso`: escapar comillas en `esc()`, botón "borrar mi perfil" y aviso de privacidad.

## Cómo volver a ejecutar la auditoría

```bash
npm test                       # batería completa (Node 22, sin dependencias)
npm run test:security          # mismo resultado, formato legible
```
En Claude Code: *"usa el agente patitas-guardian-seguridad para auditar la app"*.
El workflow `.github/workflows/security.yml` corre las pruebas en cada push/PR y cada lunes.
