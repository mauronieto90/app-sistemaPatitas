// A05/A08 — Dependencias externas, integridad y políticas del navegador.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { read } from './_helpers.mjs';

const PAGES = ['index.html', 'owen-repaso/index.html'];

for (const page of PAGES) {
  const src = read(page);

  test(`${page}: scripts externos con versión fija e integridad (SRI)`, () => {
    const tags = src.match(/<script[^>]+src=["']https?:[^>]*>/g) || [];
    for (const tag of tags) {
      assert.doesNotMatch(tag, /@latest|\/latest\//, `Versión no fijada: ${tag}`);
      assert.match(tag, /integrity=["']sha(256|384|512)-/, `Sin integrity: ${tag}`);
      assert.match(tag, /crossorigin=/, `Sin crossorigin: ${tag}`);
    }
  });

  test(`${page}: define Content-Security-Policy`, () => {
    assert.ok(/<meta[^>]+http-equiv=["']Content-Security-Policy["']/i.test(src), 'Sin CSP: un XSS puede cargar y ejecutar código de cualquier dominio');
  });

  test(`${page}: enlaces target=_blank con rel=noopener`, () => {
    const bad = (src.match(/<a[^>]+target=["']_blank["'][^>]*>/g) || []).filter(a => !/noopener/.test(a));
    assert.deepEqual(bad, []);
  });
}

test('módulos de Firebase con versión fija', () => {
  const imports = read('index.html').match(/from\s+["']https:\/\/www\.gstatic\.com\/firebasejs\/[^"']+["']/g) || [];
  assert.ok(imports.length > 0);
  for (const i of imports) assert.match(i, /firebasejs\/\d+\.\d+\.\d+\//, i);
});
