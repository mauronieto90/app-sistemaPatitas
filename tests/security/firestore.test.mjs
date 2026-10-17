// A01/A04 — Reglas de Firestore y protección contra pérdida de datos.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { read, exists } from './_helpers.mjs';

test('las reglas de Firestore están versionadas en el repo', () => {
  assert.ok(exists('firestore.rules'),
    'Falta firestore.rules: no hay forma de revisar ni restaurar las reglas que protegen los datos');
});

test('las reglas no dejan la base abierta ni en modo prueba', { skip: !exists('firestore.rules') }, () => {
  const rules = read('firestore.rules').replace(/\/\/.*$/gm, '');
  assert.doesNotMatch(rules, /if\s+true\b/, 'Hay reglas "if true": acceso total para cualquiera');
  assert.doesNotMatch(rules, /request\.time\s*</, 'Reglas de modo prueba con fecha de caducidad');
  assert.match(rules, /request\.auth\s*!=\s*null|request\.auth\.uid|request\.auth\.token/,
    'Ninguna regla exige usuario autenticado');
});

test('borrar datos requiere rol de administrador', { skip: !exists('firestore.rules') }, () => {
  const rules = read('firestore.rules').replace(/\/\/.*$/gm, '');
  const deletes = rules.match(/allow[^;]*\bdelete\b[^;]*;/g) || [];
  for (const d of deletes) {
    assert.match(d, /admin/i, `Borrado permitido sin verificar rol admin: ${d.trim()}`);
  }
});
