<script lang="ts">
  import { PublicKey, Transaction } from '@solana/web3.js';
  import { connection } from '../ts/constants';
  import { BlogService } from '../ts/blog_service';
  import { useWallet } from 'wallet-adapter-x';

  export let postAddress: string;
  export let postAuthor: string;

  const { publicKey, sendTransaction } = useWallet();
  $: isOwnProfile = postAuthor == $publicKey?.toString();

  const blogService = new BlogService(connection);

  const onDeletePost = async () => {
    if (!$publicKey || !sendTransaction) return;

    const deletePostIx = await blogService.createDeletePostIx({
      authority: $publicKey,
      post: new PublicKey(postAddress),
    });

    const tx = new Transaction().add(deletePostIx);
    await sendTransaction(tx, connection);
    window.location.replace('/');
  };
</script>

{#if isOwnProfile === true}
  <button
    on:click={onDeletePost}
    class="bouncy-button ml-5 rounded-lg border-2 border-red-900 bg-red-900/50 px-4 py-2 font-heading font-light"
  >
    Delete Post
  </button>
{/if}
