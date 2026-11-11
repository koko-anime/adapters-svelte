/**
 * `@koko-anime/adapters-svelte` — natywna reaktywność Svelte 5 dla dokumentów @koko-anime/formats.
 *
 * ```ts
 * defineConfig({ plugins: [svelte()] });
 * // w komponencie: <input bind:value={line.text} /> — bez mostków i $state()
 * ```
 * Nie przekazuj dokumentów do `$state()` — są już reaktywne.
 */
import { untrack } from 'svelte';
import { createSubscriber } from 'svelte/reactivity';
import { definePlugin, type Atom } from '@koko-anime/formats/plugin';

function createAtom(): Atom {
  let update: (() => void) | undefined;
  const subscribe = createSubscriber((u) => {
    update = u;
    return () => {
      update = undefined;
    };
  });
  return {
    track: subscribe,
    trigger: () => update?.(),
  };
}

export function svelte() {
  return definePlugin({
    name: 'svelte',
    api: '0.4',
    reactivity: { createAtom, untrack },
  });
}
