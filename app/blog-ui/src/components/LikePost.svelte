<script lang="ts">
  import { PublicKey, Transaction } from '@solana/web3.js';
  import { connection } from '../ts/constants';
  import { Post } from '../ts/sdk/src';
  import { BlogService } from '../ts/blog_service';
  import { useWallet } from 'wallet-adapter-x';
  import { sleep } from '../ts/utils';
  import HeartIcon from './HeartIcon.svelte';

  const { publicKey, sendTransaction } = useWallet();

  export let post: Post;
  export let postAddress: string;

  $: likesCount = post.likesCount;

  const blogService = new BlogService(connection);

  const onLike = async () => {
    if (!$publicKey && !sendTransaction) return;

    const ix = await blogService.createLikePostIx({
      authority: publicKey.get()!,
      post: new PublicKey(postAddress),
    });

    const tx = new Transaction().add(ix);
    await sendTransaction(tx, connection).catch((e) => {
      return;
    });
    // This is not the safest way to wait for the changes, but the easiest
    await sleep(2000);

    likesCount = (
      await Post.fromAccountAddress(connection, new PublicKey(postAddress))
    ).likesCount;
  };
</script>

<div class="flex flex-row items-center justify-start space-x-3">
  <button on:click={() => onLike()} class="bouncy-button h-6 w-6 fill-red-800">
    <HeartIcon />
  </button>
  <p class="font-heading text-lg font-thin">
    {likesCount} Likes
  </p>
</div>
