// A03 — Inyección / Cross-Site Scripting.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { read, grepLines, loadFunction, fmtHits } from './_helpers.mjs';

const html = read('index.html');
const owen = read('owen-repaso/js/app.js');

const PAYLOADS = [
  '<img src=x onerror=alert(1)>',
  '"><svg onload=alert(1)>',
  "');alert(1);//",
  "' onmouseover='alert(1)",
];

function assertInert(escaped, raw) {
  assert.doesNotMatch(escaped, /[<>"']/, `Sigue habiendo caracteres peligrosos al escapar ${raw} → ${escaped}`);
}

test('san() neutraliza payloads XSS (index.html)', () => {
  const san = loadFunction(html, 'san');
  for (const p of PAYLOADS) assertInert(san(p), p);
  assert.equal(san('Concentrado Dog Chow 2kg'), 'Concentrado Dog Chow 2kg');
});

test('esc() neutraliza payloads XSS, también dentro de atributos (owen-repaso)', () => {
  const esc = loadFunction(owen, 'esc');
  for (const p of PAYLOADS) assertInert(esc(p), p);
});

// Campos que vienen de Firestore o de lo que escribe el usuario.
const UNTRUSTED = /\$\{\s*(?!san\()[\w.]*\b(?:r|item|p|v|c|x|o|it|row|venta|prov)\.(?:p|n|sub|producto|concepto|prov|proveedor|cliente|nombre|pago|desc|descripcion|obs|notas)\b[^}]*\}|\$\{\s*(?:err|e)\.message\s*\}|\$\{\s*(?:concepto|provVal|pago|nombre|cliente)\s*\}/;

test('ningún dato de Firestore/usuario se inserta en HTML sin san()', () => {
  const hits = grepLines(html, /<[a-z]/i).filter(l => UNTRUSTED.test(l.text));
  assert.equal(hits.length, 0,
    `Interpolaciones sin escapar en plantillas HTML (XSS almacenado vía Firestore):\n${fmtHits(hits)}`);
});

test('no se usan eval / new Function / document.write', () => {
  for (const [name, src] of [['index.html', html], ['owen-repaso/js/app.js', owen]]) {
    const hits = grepLines(src, /\beval\s*\(|new Function\s*\(|document\.write\s*\(/);
    assert.equal(hits.length, 0, `${name}:\n${fmtHits(hits)}`);
  }
});
