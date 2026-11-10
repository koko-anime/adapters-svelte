import { expect, test } from 'bun:test';
import { flushSync } from 'svelte';
// API wewnętrzne Svelte — tylko w teście; w aplikacji efekty tworzy kompilator.
import { effect_root, render_effect } from 'svelte/internal/client';
import { svelte } from '../src/index.ts';
import { docWith } from './helpers.ts';

test('Svelte 5: odświeża tylko zmienioną linię', () => {
  const doc = docWith(svelte());
  const seen: string[] = [];
  let far = 0;
  const stop = effect_root(() => {
    render_effect(() => { seen.push(doc.events.dialogues[2]!.analysis.spokenText); });
    render_effect(() => { void doc.events.dialogues[8]!.analysis.spokenText; far++; });
  });
  flushSync();
  doc.events.dialogues[2]!.text = 'Idę do ogrodu.';
  flushSync();
  expect(seen).toEqual(['Idę do pałacu.', 'Idę do ogrodu.']);
  expect(far).toBe(1);
  stop();
});
