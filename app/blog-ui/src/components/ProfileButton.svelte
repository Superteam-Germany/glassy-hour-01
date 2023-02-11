<script lang="ts">
  import { useWallet } from 'wallet-adapter-x';

  const { connected, publicKey } = useWallet();

  $: isOwnProfile =
    $publicKey &&
    window.location.href.split('/profile/')[1] === $publicKey?.toString();
</script>

{#if $connected && $publicKey}
  <a
    href={`/profile/${$publicKey.toString()}`}
    rel="prefetch"
    target="_parent"
    class={`bouncy-button ml-3 flex h-12 w-12 items-center justify-center rounded-lg border-2 border-white/10 text-xl ${
      isOwnProfile ? 'bg-primary/20' : 'bg-surface'
    }`}
    >👤
  </a>
{/if}
