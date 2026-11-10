import { readFileSync } from 'node:fs';
import { defineConfig, resetConfig } from '@koko-anime/formats/config';
import type { KokoPlugin } from '@koko-anime/formats/plugin';
import { KokoAss } from '@koko-anime/formats/ass';

export const SRC = readFileSync(new URL('./spec-example.ass', import.meta.url), 'utf8');

export function docWith(plugin: KokoPlugin): KokoAss {
  resetConfig();
  defineConfig({ plugins: [plugin] });
  return KokoAss.parse(SRC) as KokoAss;
}
