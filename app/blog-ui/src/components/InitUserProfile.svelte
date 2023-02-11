<script lang="ts">
  import { Transaction } from '@solana/web3.js';
  import { connection, MAX_TWITTER_NAME_LENGTH } from '../ts/constants';
  import { BlogService } from '../ts/blog_service';
  import { useWallet } from 'wallet-adapter-x';
  import Dialog from './Dialog.svelte';

  $: isOwnProfile =
    window.location.href.split('/profile/')[1] === $publicKey?.toString();

  $: showCreateProfileDialog = false;
  $: inputValid = null as boolean | null;

  const { publicKey, sendTransaction } = useWallet();

  const blogService = new BlogService(connection);

  const createProfile = async (twitterHandle: string) => {
    if (!$publicKey || !sendTransaction) return;

    const userProfileIx = await blogService.createUserProfileIx({
      authority: $publicKey,
      twitterHandle,
    });
    const tx = new Transaction().add(userProfileIx);
    await sendTransaction(tx, connection);
    window.location.reload();
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await createProfile(e.target[0].value);
    showCreateProfileDialog = false;
  };

  const onInput = (e: any) => {
    const twitterHandle = e.target.value;
    if (
      twitterHandle.length > 0 &&
      twitterHandle.length <= MAX_TWITTER_NAME_LENGTH
    ) {
      inputValid = true;
    } else {
      inputValid = false;
    }
  };
</script>

{#if isOwnProfile === true}
  <div
    class="group absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center"
  >
    <p class="text-[100px] group-hover:hidden">🫥</p>
    <p class="hidden text-[100px] group-hover:inline-block">🥹</p>
    <div class="flex flex-col space-y-2">
      <p class="text-base font-medium text-white/80">
        It seems like you don't have a profile yet.
      </p>
      <button
        class="text-lg hover:text-primary hover:underline"
        on:click={() => (showCreateProfileDialog = true)}
      >
        Create one now
      </button>
    </div>
  </div>
{/if}

<!-- Create Profile Dialog -->
{#if showCreateProfileDialog === true}
  <Dialog
    title="Create Profile"
    onClose={() => (showCreateProfileDialog = false)}
  >
    <div class="mt-5 w-96">
      <form
        class="flex flex-col space-y-5"
        on:submit={onSubmit}
        on:keyup={onInput}
      >
        <div class="flex flex-col space-y-2">
          <p class="text-sm text-white/60">Twitter Handle</p>
          <input class="w-full" placeholder="elonmusk..." required />
        </div>
        <button
          disabled={inputValid !== true}
          class={`bouncy-button w-full rounded-lg border-2 py-2 text-center font-heading ${
            inputValid === true
              ? 'border-primary bg-primary'
              : 'border-white/10 bg-surface'
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  </Dialog>
{/if}
