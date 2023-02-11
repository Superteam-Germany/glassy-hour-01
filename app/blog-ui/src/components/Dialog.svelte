<script lang="ts">
  import { fly } from 'svelte/transition';
  import CloseIcon from './CloseIcon.svelte';

  const animateFly = (node: Element) => {
    return fly(node, {
      duration: 300,
      x: 0,
      y: -10,
    });
  };

  export let onClose = () => {};
  export let title = '';
</script>

<div
  transition:animateFly
  class="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/60"
>
  <div class="rounded-2xl border-2 border-primary bg-background p-7 pb-8">
    <div class="flex flex-row items-center justify-between space-x-4">
      <h2 class="font-heading text-2xl font-bold">{title}</h2>
      <button
        on:click={onClose}
        class="bouncy-button flex items-center justify-center rounded-full border-2 border-white/20 p-2 opacity-50"
      >
        <CloseIcon />
      </button>
    </div>

    <slot />
  </div>
</div>
