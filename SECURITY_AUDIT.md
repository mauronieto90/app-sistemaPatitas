# Auditoría de seguridad — Patitas Peludas

**Alcance:** `index.html` (Sistema de Gestión + Firebase) y `owen-repaso/`
**Agente:** `patitas-guardian-seguridad` (`.claude/agents/patitas-guardian-seguridad.md`)

| Fecha | Fase | Pruebas (`npm test`) |
|-------|------|----------------------|
| 2026-10-17 | Auditoría inicial | 18 pruebas: 10 OK, 8 fallan |
| 2026-10-17 | Fase 2: login con Firebase Auth + escape XSS + app reparada | 20 pruebas: **17 OK, 3 fallan** (SRI y CSP, fase 3) |

## Veredicto de lanzamiento: ⚠️ LISTO EN CÓDIGO, PENDIENTE DE CONFIGURACIÓN

El código ya no tiene contraseñas, valida el acceso con Firebase y escapa los datos.
Para lanzar falta **configurar Firebase** (usuarios, perfiles y reglas, ~20 minutos), siguiendo
los pasos de [Puesta en marcha](#puesta-en-marcha). Hasta entonces nadie podrá entrar.

## Hallazgos

| ID | Severidad | Hallazgo | Estado |
|----|-----------|----------|--------|
| PP-11 | 🔴 Crítica | **La app de este repositorio llevaba rota desde el 13-may-2026 (`064ede2`).** Una comilla invertida escapada (`` \` ``) impedía compilar el bloque principal de JavaScript; además `sessionDelta`, `selState` estaban declaradas dos veces y `cmpMesOpciones` se usaba antes de declararse. Resultado: menú, buscador, inventario, modales y `san()` no se ejecutaban. | ✅ Corregido. Verificado en Chromium: 13 secciones sin errores. Prueba `integridad.test.mjs` |
| PP-01 | 🔴 Crítica | Contraseñas en texto plano en `index.html` (objeto `USERS`) | ✅ Eliminadas. Login con Firebase Authentication. Las claves viejas siguen en el historial de git: **no reutilizarlas en ningún lado** |
| PP-02 | 🔴 Crítica | Se entraba como admin con `sessionStorage.setItem('pp_user','admin')` | ✅ La sesión la decide Firebase (`onAuthStateChanged`). Verificado en navegador |
| PP-03 | 🔴 Crítica | Reglas de Firestore sin versionar / desconocidas | ✅ `firestore.rules` en el repo. ⏳ **Falta publicarlas** (paso 4) |
| PP-04 | 🟠 Alta | El rol vendedor podía hacer todo | ✅ Reglas: vendedor registra ventas y descuenta stock; solo admin edita/borra ventas, ve compras, gastos, finanzas y exportación. El menú oculta esas secciones al vendedor |
| PP-05 | 🟠 Alta | XSS almacenado: decenas de datos de Firestore/usuario insertados en HTML sin escapar, incluidos handlers `onclick` | ✅ ~95 puntos pasan por `san()` y 26 argumentos de `onclick` por `jsq()`. Verificado: el ataque se ejecuta 8 veces en la versión anterior y 0 en la nueva |
| PP-09 | 🔵 Baja | `owen-repaso` `esc()` no escapaba comillas | ✅ Corregido |
| PP-06 | 🟡 Media | Scripts de cdnjs sin `integrity` (SRI) | ⏳ Fase 3 |
| PP-07 | 🟡 Media | Sin Content-Security-Policy | ⏳ Fase 3 |
| PP-08 | 🟡 Media | `xlsx 0.18.5` con vulnerabilidades conocidas (CVE-2023-30533, CVE-2024-22363) | ⏳ Fase 3 |
| PP-10 | 🔵 Baja | `owen-repaso` guarda el correo de un adulto en localStorage | ⏳ Fase 3 |

### Cambios de comportamiento que debes conocer
- Se entra con **correo y contraseña** (ya no "admin"/"vendedor").
- La sesión dura mientras la pestaña esté abierta; al cerrarla hay que volver a entrar.
- Nuevo botón **Salir** en el menú (y "Cerrar sesión" en el menú del celular).
- El vendedor ya **no puede editar ni borrar ventas** ni cambiar precios: si se equivoca, lo corrige el admin.
  Si prefieres que pueda corregir sus ventas del día, se ajusta en `firestore.rules`.
- Los cierres de caja siguen guardándose solo en el navegador (`localStorage`), como antes.

## Puesta en marcha

Haz los pasos **en este orden**; publicar el código antes que las reglas no rompe nada, pero
nadie podrá entrar hasta completar los pasos 1–3.

1. **Activar el inicio de sesión** — [Consola de Firebase](https://console.firebase.google.com/project/patitas-peludas-4089f/authentication/providers)
   → Authentication → *Sign-in method* → **Correo electrónico/contraseña** → Habilitar.
2. **Crear un usuario por persona** — Authentication → *Users* → *Add user* (correo + contraseña
   nueva, mínimo 12 caracteres). Copia el **UID** de cada uno.
3. **Crear su perfil** — Firestore Database → *Iniciar colección* `usuarios` → ID del documento =
   el **UID** del paso 2, con los campos:
   | Campo | Tipo | Valor |
   |-------|------|-------|
   | `nombre` | string | p. ej. `Mauro` |
   | `rol` | string | `admin` o `vendedor` |
   | `activo` | boolean | `true` |

   Para quitarle el acceso a alguien después: pon `activo` en `false` (o deshabilita el usuario en Authentication).
4. **Publicar las reglas** — Firestore Database → *Reglas* → pegar el contenido de `firestore.rules`
   → *Publicar*. (Con la CLI: `firebase deploy --only firestore:rules --project patitas-peludas-4089f`.)
5. **Probar** con una cuenta admin y una vendedor: registrar una venta, ver inventario, y comprobar
   que el vendedor no ve Compras/Finanzas.
6. **Fusionar esta rama a `main`** para que GitHub Pages publique la nueva versión.

## Pendiente

### Continuidad de los datos (recomendado esta semana)
- Activar recuperación a un punto en el tiempo y protección contra borrado:
  `gcloud firestore databases update --database='(default)' --enable-pitr --delete-protection`
- Export diario: `gcloud firestore export gs://patitas-backups/$(date +%F)` con Cloud Scheduler y
  retención de 30–90 días. Mensualmente, descargar un Excel desde la app y guardarlo fuera de Google.
- Restringir la API key a tu dominio (Google Cloud → Credenciales → referrers HTTP) y activar App Check.
- GitHub: 2FA en la cuenta y proteger `main` (requerir PR y el check *Pruebas de seguridad*).

### Fase 3 — endurecimiento
- `integrity` + `crossorigin` en los scripts de cdnjs y `<meta http-equiv="Content-Security-Policy">`.
- Reemplazar `xlsx 0.18.5` por la versión actual de SheetJS, alojada en el repo.
- `owen-repaso`: botón "borrar mi perfil" y aviso de privacidad.

## Cómo volver a ejecutar la auditoría

```bash
npm test                 # batería completa (Node 22, sin dependencias)
npm run test:security    # mismo resultado, formato legible
```
En Claude Code: *"usa el agente patitas-guardian-seguridad para auditar la app"*.
El workflow `.github/workflows/security.yml` corre las pruebas en cada push/PR y cada lunes.
