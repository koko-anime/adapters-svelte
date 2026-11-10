// Wewnętrzne API Svelte używane wyłącznie w teście adaptera.
declare module 'svelte/internal/client' {
  export function effect_root(fn: () => void): () => void;
  export function render_effect(fn: () => void): void;
}
