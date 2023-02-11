import type { bignum } from '@metaplex-foundation/beet';
import * as anchor from '@project-serum/anchor';
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey';
import { BN } from 'bn.js';
import { PROGRAM_ID } from './sdk/src';
import { POST_TAG, USER_PROFILE_TAG } from './constants';

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const isPubKeyValid = (address: string | undefined): boolean => {
  if (!address) return false;
  try {
    return anchor.web3.PublicKey.isOnCurve(address);
  } catch (e) {
    return false;
  }
};

export const bignumToNumber = (num: bignum): number => {
  return new BN(num).toNumber();
};

export const numberToU16Le = (num: number) => {
  return Buffer.from([num & 0xff, (num >> 8) & 0xff]); // u16 to le bytes
};

export const getTwitterUrl = (twitterHandle: string) => {
  return `https://twitter.com/${twitterHandle}`;
};

export const getPostPDA = (
  postCount: number,
  authority: anchor.web3.PublicKey
) => {
  const [post] = findProgramAddressSync(
    [POST_TAG, numberToU16Le(postCount), authority.toBuffer()],
    PROGRAM_ID
  );
  return post;
};

export const getUserProfilePDA = (authority: anchor.web3.PublicKey) => {
  const [userProfile] = findProgramAddressSync(
    [USER_PROFILE_TAG, authority.toBuffer()],
    PROGRAM_ID
  );
  return userProfile;
};
