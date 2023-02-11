<script lang="ts">
  import type { WalletName } from '@solana/wallet-adapter-base';
  import { LAMPORTS_PER_SOL } from '@solana/web3.js';
  import { fly } from 'svelte/transition';
  import SolanaLogo from './SolanaLogo.svelte';
  import Dialog from './Dialog.svelte';
  import { connection } from '../ts/constants';
  import { useWallet } from 'wallet-adapter-x';

  const {
    wallets,
    select,
    connect,
    disconnect,
    publicKey,
    connected,
    disconnecting,
    wallet,
  } = useWallet();

  $: showWalletDialog = false;
  $: showWalletFlyOut = false;

  const onSelect = async (name: WalletName<string>) => {
    select(name);
    await connect();
  };

  const animateFly = (node: Element) => {
    return fly(node, {
      duration: 300,
      x: 0,
      y: -10,
    });
  };

  const onConnect = () => {
    if (!$connected) {
      showWalletDialog = true;
    } else {
      showWalletFlyOut = true;
    }
  };

  const onDisconnect = async () => {
    await disconnect();
    showWalletFlyOut = false;
  };

  const onChangeWallet = () => {
    showWalletDialog = true;
    showWalletFlyOut = false;
  };
</script>

<!-- Connect Wallet Dialog -->
{#if showWalletDialog === true}
  <Dialog
    title="Connect your Wallet"
    onClose={() => (showWalletDialog = false)}
  >
    <div class="mt-5 flex w-96 flex-col space-y-5">
      {#each $wallets ?? [] as walletAdapter}
        <button
          on:click={() => {
            onSelect(walletAdapter.adapter.name);
            showWalletDialog = false;
          }}
          class="flex flex-row items-center space-x-5 rounded-lg border-2 border-white/5 bg-surface p-3 outline-primary transition-all hover:outline"
        >
          <img src={walletAdapter.adapter.icon} alt="Icon" class="h-9 w-9" />
          <p class="text-start font-heading text-xl font-normal text-white">
            {walletAdapter.adapter.name}
          </p>
        </button>
      {/each}
    </div>
  </Dialog>
{/if}

<!-- Needed to hide FlyOut when user taps outside of the button area -->
{#if showWalletFlyOut === true}
  <button
    on:click={() => (showWalletFlyOut = false)}
    class="fixed left-0 top-0 z-0 h-screen w-screen cursor-default"
  />
{/if}

<div class="relative z-10 flex flex-col">
  <button
    on:click={onConnect}
    class={`flex items-start justify-center rounded-lg border-2 border-white/10 bg-surface px-6 pt-2.5 transition-all
    ${
      showWalletFlyOut ? 'pointer-events-none h-[158px]' : 'bouncy-button h-12'
    }`}
  >
    <!-- Always Visible when connected -->
    {#if $connected && $publicKey}
      <div class="flex flex-row space-x-2">
        <img src={$wallet?.adapter.icon} alt="Icon" class="h-5 w-5" />
        <p>{$publicKey.toString().slice(0, 4)}</p>

        <div>
          <div class="mx-2 h-6 w-[1.5px] bg-white/10" />
        </div>

        <div class="flex flex-row items-center justify-center space-x-2">
          <div class="h-3.5">
            <SolanaLogo />
          </div>
          {#await connection.getBalance($publicKey)}
            <div
              class="h-full animate-pulse rounded-md bg-gradient-to-br from-white/10 to-white/20"
            />
          {:then balance}
            <p>{(balance / LAMPORTS_PER_SOL).toFixed(2)}</p>
          {/await}
        </div>
      </div>
    {:else}
      <p class="font-heading font-medium">Connect Wallet</p>
    {/if}

    <!-- Visible when button pressed -->
    {#if showWalletFlyOut === true}
      <div
        class="pointer-events-auto absolute top-14 flex w-full flex-col items-center justify-center px-2"
        transition:animateFly
      >
        {#if showWalletFlyOut === true}
          <button
            on:click={onChangeWallet}
            disabled={!$connected || $disconnecting}
            class="bouncy-button w-full rounded-lg border border-white/10 p-2 font-medium"
          >
            Change Wallet
          </button>
          <button
            on:click={onDisconnect}
            disabled={!$connected || $disconnecting}
            class="bouncy-button my-2 w-full rounded-lg bg-primary p-2 font-medium"
          >
            Disconnect
          </button>
        {/if}
      </div>
    {/if}
  </button>
</div>
