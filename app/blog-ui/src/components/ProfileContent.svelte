<script lang="ts">
  import { BlogService } from '../ts/blog_service';
  import * as anchor from '@project-serum/anchor';
  import { connection } from '../ts/constants';

  const blogService = new BlogService(connection);
</script>

<div class="">
  {#await blogService.getUserProfile(new anchor.web3.PublicKey('EyKVXEZD2fsPHUjbZvDmrjvbCgdiqZtxChUtPLTMBHEF'))}
    LOADING
  {:then userProfile}
    <p>{userProfile?.twitterHandle}</p>
  {/await}
</div>
