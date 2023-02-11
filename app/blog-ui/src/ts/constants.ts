import { Connection } from '@solana/web3.js';

export const connection = new Connection(
  'https://snowy-icy-model.solana-devnet.quiknode.pro/db62b4a4a78d544eadd831d1b861d664a69ae051/',
  'processed'
);

export const POST_TAG = Buffer.from('POST_STATE');
export const USER_PROFILE_TAG = Buffer.from('USER_PROFILE_STATE');

export const POST_MAX_SIZE = 3092;
export const USER_PROFILE_MAX_SIZE = 61;

export const MAX_TITLE_LENGTH = 32;
export const MAX_CONTENT_LENGTH = 3000;
export const MAX_TWITTER_NAME_LENGTH = 15;
