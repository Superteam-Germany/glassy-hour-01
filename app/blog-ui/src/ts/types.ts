import type { bignum } from '@metaplex-foundation/beet';
import type * as anchor from '@project-serum/anchor';

export type FeedEntry = {
  postAddress: anchor.web3.PublicKey;
  authority: anchor.web3.PublicKey;
  twitterHandle: string;
  createdPostsCount: number;
  title: string;
  content: string;
  likesCount: number;
  createdAt: bignum;
};
