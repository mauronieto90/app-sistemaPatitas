// A01/A07 — Autenticación, autorización y secretos.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { read, grepLines, fmtHits } from './_helpers.mjs';

const html = read('index.html');

test('no hay contraseñas escritas en el código del cliente', () => {
  const hits = grepLines(html, /\b(pass|password|contrase[nñ]a|clave)\s*:\s*['"][^'"]{3,}['"]/i);
  assert.equal(hits.length, 0,
    'Contraseñas visibles para cualquiera con "Ver código fuente":\n' +
    fmtHits(hits.map(h => ({ ...h, text: h.text.replace(/(['"])[^'"]{3}[^'"]*\1/g, "'***'") }))));
});

test('no hay claves privadas ni cuentas de servicio en el repo', () => {
  for (const f of ['index.html', 'owen-repaso/js/app.js', 'owen-repaso/index.html']) {
    const src = read(f);
    assert.doesNotMatch(src, /-----BEGIN (RSA |EC )?PRIVATE KEY-----/, f);
    assert.doesNotMatch(src, /"private_key"\s*:/, f);
    assert.doesNotMatch(src, /\bsk_live_[0-9a-zA-Z]{10,}/, f);
  }
});

test('el login usa Firebase Authentication (validación en servidor)', () => {
  assert.ok(/\bgetAuth\b/.test(html), 'No se inicializa Firebase Auth: el login solo existe en el navegador');
  assert.ok(/signInWithEmailAndPassword|signInWithPopup|signInWithRedirect/.test(html), 'No hay inicio de sesión real contra Firebase');
});

test('la sesión no se restaura solo con un valor de sessionStorage', () => {
  const hits = grepLines(html, /sessionStorage\.getItem\(['"]pp_user['"]\)/);
  assert.equal(hits.length, 0,
    "Basta con ejecutar sessionStorage.setItem('pp_user','admin') en la consola para entrar como admin:\n" +
    fmtHits(hits));
});
