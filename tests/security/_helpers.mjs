// Utilidades compartidas por las pruebas de seguridad (sin dependencias externas).
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

export function read(rel) {
  return readFileSync(join(ROOT, rel), 'utf8');
}

export function exists(rel) {
  return existsSync(join(ROOT, rel));
}

// Devuelve [{ line, text }] de las líneas que cumplen el patrón.
export function grepLines(src, re) {
  return src.split('\n')
    .map((text, i) => ({ line: i + 1, text }))
    .filter(l => re.test(l.text));
}

// Extrae una función `function nombre(...) { ... }` del código y la evalúa aislada.
export function loadFunction(src, name) {
  const start = src.search(new RegExp(`function ${name}\\s*\\(`));
  if (start < 0) throw new Error(`No se encontró la función ${name}()`);
  let depth = 0, i = src.indexOf('{', start);
  for (; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}' && --depth === 0) break;
  }
  const ctx = {};
  vm.runInNewContext(`${src.slice(start, i + 1)}; this.fn = ${name};`, ctx);
  return ctx.fn;
}

export function fmtHits(hits, max = 15) {
  const shown = hits.slice(0, max).map(h => `  L${h.line}: ${h.text.trim().slice(0, 160)}`);
  if (hits.length > max) shown.push(`  … y ${hits.length - max} más`);
  return shown.join('\n');
}
