// Las reglas de Firestore del proyecto patitas-peludas-4089f viven en el repo
// mauronieto90/petflow-app (la app en producción). Este repo NO debe traer reglas
// ni firebase.json: un `firebase deploy` desde aquí sobrescribiría las de PetFlow.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { exists } from './_helpers.mjs';

test('este repo no trae reglas de Firestore que puedan pisar las de PetFlow', () => {
  assert.ok(!exists('firestore.rules'), 'Las reglas se gestionan en petflow-app');
  assert.ok(!exists('firebase.json'), 'Un firebase.json aquí permite desplegar por error sobre producción');
});
