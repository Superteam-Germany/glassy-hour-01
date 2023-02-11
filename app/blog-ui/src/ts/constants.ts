import { Connection, clusterApiUrl } from '@solana/web3.js';

export const connection = new Connection(clusterApiUrl('devnet'), 'processed');

export const POST_TAG = Buffer.from('POST_STATE');
export const USER_PROFILE_TAG = Buffer.from('USER_PROFILE_STATE');

export const POST_MAX_SIZE = 3092;
export const USER_PROFILE_MAX_SIZE = 61;

export const MAX_TITLE_LENGTH = 32;
export const MAX_CONTENT_LENGTH = 3000;
export const MAX_TWITTER_NAME_LENGTH = 15;
