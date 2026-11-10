# @koko-anime/adapters-svelte

Adapter Svelte 5 dla [`@koko-anime/formats`](https://www.npmjs.com/package/@koko-anime/formats) — dokumenty Koko-ASS, Koko-Lexicon i Koko-Pack zachowują się w komponentach jak natywny stan frameworka.

```sh
bun add @koko-anime/formats @koko-anime/adapters-svelte
```

```ts
// src/koko.config.ts — importowany jako pierwszy
import { defineConfig } from '@koko-anime/formats/config';
import { svelte } from '@koko-anime/adapters-svelte';

export default defineConfig({ plugins: [svelte()] });
```

```svelte
<script lang="ts">
  import type { KokoAss } from '@koko-anime/formats/ass';
  let { ass }: { ass: KokoAss } = $props();
</script>

{#each ass.events.dialogues as line (line.id)}
  <input bind:value={line.text} />
  <span>{line.analysis.spokenText}</span>  <!-- odświeża się tylko ta linia -->
{/each}
```

- Wymaga Svelte ≥ 5.7 (`createSubscriber`). Zwykły plik `.ts` — bez kompilacji `.svelte.ts`.
- Nie przekazuj dokumentów do `$state()` — są już reaktywne.
- Testy działają z `--conditions browser`: w Bun domyślnie ładuje się serwerowy build Svelte, w którym reaktywność jest wyłączona.

Wersja 0.1.0 · wymaga `@koko-anime/formats ~0.3.0` · licencja MIT.

## Rozwój

```sh
bun install
bun run test
bun run typecheck
bun run build
```

Do czasu publikacji `@koko-anime/formats@0.3.0` na npm: w repo rdzenia `cd packages/formats && bun run build && bun link`, a tutaj `bun link @koko-anime/formats` przed `bun install`.
