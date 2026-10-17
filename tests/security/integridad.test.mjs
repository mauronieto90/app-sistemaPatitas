// Integridad del código: si un bloque <script> no compila o choca con otro,
// el navegador lo descarta entero y la app deja de funcionar sin avisar.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { read } from './_helpers.mjs';

function scripts(rel) {
  const html = read(rel);
  const lineOf = i => html.slice(0, i).split('\n').length;
  return [...html.matchAll(/<script(\s[^>]*)?>([\s\S]*?)<\/script>/g)]
    .filter(m => !/\bsrc=/.test(m[1] || ''))
    .map(m => ({ code: m[2], module: /type=["']module["']/.test(m[1] || ''), line: lineOf(m.index) }));
}

test('index.html: todos los <script> compilan', () => {
  const dir = mkdtempSync(join(tmpdir(), 'patitas-'));
  try {
    for (const s of scripts('index.html')) {
      if (s.module) {
        const f = join(dir, `l${s.line}.mjs`);
        writeFileSync(f, s.code);
        const r = spawnSync(process.execPath, ['--check', f], { encoding: 'utf8' });
        assert.equal(r.status, 0, `El <script type="module"> de la línea ${s.line} no compila:\n${r.stderr}`);
      } else {
        try { new vm.Script(s.code); }
        catch (e) { assert.fail(`El <script> de la línea ${s.line} no compila: ${e.message}`); }
      }
    }
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('index.html: no hay let/const/class globales declarados dos veces entre bloques', () => {
  const seen = new Map();
  const dup = [];
  for (const s of scripts('index.html').filter(s => !s.module)) {
    for (const m of s.code.matchAll(/^(let|const|var|class|function|async function)\s+([A-Za-z_$][\w$]*)/gm)) {
      const prev = seen.get(m[2]);
      if (prev && prev.line !== s.line && (/^(let|const|class)$/.test(m[1]) || /^(let|const|class)$/.test(prev.kind)))
        dup.push(`${m[2]} (bloques de las líneas ${prev.line} y ${s.line})`);
      if (!prev) seen.set(m[2], { kind: m[1], line: s.line });
    }
  }
  assert.deepEqual(dup, [], 'Declaraciones duplicadas: el segundo bloque falla con "Identifier has already been declared"');
});
