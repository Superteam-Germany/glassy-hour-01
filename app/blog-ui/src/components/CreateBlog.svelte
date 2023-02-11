<script lang="ts">
  import { Transaction } from '@solana/web3.js';
  import {
    connection,
    MAX_CONTENT_LENGTH,
    MAX_TITLE_LENGTH,
  } from '../ts/constants';
  import { BlogService } from '../ts/blog_service';
  import { useWallet } from 'wallet-adapter-x';
  import Dialog from './Dialog.svelte';

  $: isOwnProfile =
    window.location.href.split('/profile/')[1] === $publicKey?.toString();

  $: showCreatePostDialog = false;
  $: inputValid = null as boolean | null;

  const { publicKey, connected, sendTransaction } = useWallet();

  const blogService = new BlogService(connection);

  const createBlog = async (title: string, content: string) => {
    if (!$connected || !$publicKey) return;

    const ix = await blogService.createPostIx({
      authority: $publicKey,
      title: title,
      content: content,
    });
    const tx = new Transaction().add(ix);
    await sendTransaction!(tx, connection);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const titleValue = (document.querySelector("input[name='title']") as any)
      .value as string;
    const contentValue = (
      document.querySelector("textarea[name='content']") as any
    ).value as string;

    await createBlog(titleValue, contentValue);

    showCreatePostDialog = false;

    window.location.reload();
  };

  const onInput = () => {
    const titleValue = (document.querySelector("input[name='title']") as any)
      .value as string;
    const contentValue = (
      document.querySelector("textarea[name='content']") as any
    ).value as string;

    if (
      titleValue.length > 0 &&
      titleValue.length < MAX_TITLE_LENGTH &&
      contentValue.length > 100 &&
      contentValue.length < MAX_CONTENT_LENGTH
    ) {
      inputValid = true;
    } else {
      inputValid = false;
    }
  };
</script>

<!-- Create Post Dialog -->
{#if showCreatePostDialog === true}
  <Dialog title="Create Profile" onClose={() => (showCreatePostDialog = false)}>
    <div class="mt-5 w-96">
      <form
        class="flex flex-col space-y-5"
        on:submit={onSubmit}
        on:keyup={onInput}
      >
        <div class="flex flex-col space-y-2">
          <p class="text-sm text-white/60">Title (max 32 letters)</p>
          <input
            class="w-full"
            name="title"
            placeholder="What is Solana?"
            maxlength={MAX_TITLE_LENGTH}
            required
          />
        </div>
        <div class="flex flex-col space-y-2">
          <p class="text-sm text-white/60">
            Content (min 100, max 3000 letters)
          </p>
          <textarea
            class="w-full"
            name="content"
            rows="10"
            placeholder="Solana is a blockchain platform that enables..."
            maxlength={MAX_CONTENT_LENGTH}
            required
          />
        </div>
        <button
          name="content"
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

{#if isOwnProfile === true}
  <button
    class="bouncy-button mt-3 flex w-[26rem] items-center justify-center rounded-lg border-2 border-white/10 bg-surface p-3 font-heading text-lg text-white"
    on:click={() => (showCreatePostDialog = true)}
  >
    Create Post
  </button>
{/if}
