/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';

/**
 * @category Instructions
 * @category LikePost
 * @category generated
 */
export type LikePostInstructionArgs = {
  postCount: number;
};
/**
 * @category Instructions
 * @category LikePost
 * @category generated
 */
export const likePostStruct = new beet.BeetArgsStruct<
  LikePostInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['postCount', beet.u16],
  ],
  'LikePostInstructionArgs'
);
/**
 * Accounts required by the _likePost_ instruction
 *
 * @property [] blogPostAuthority
 * @property [_writable_] post
 * @property [_writable_, **signer**] authority
 * @category Instructions
 * @category LikePost
 * @category generated
 */
export type LikePostInstructionAccounts = {
  blogPostAuthority: web3.PublicKey;
  post: web3.PublicKey;
  authority: web3.PublicKey;
  systemProgram?: web3.PublicKey;
  anchorRemainingAccounts?: web3.AccountMeta[];
};

export const likePostInstructionDiscriminator = [
  45, 242, 154, 71, 63, 133, 54, 186,
];

/**
 * Creates a _LikePost_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category LikePost
 * @category generated
 */
export function createLikePostInstruction(
  accounts: LikePostInstructionAccounts,
  args: LikePostInstructionArgs,
  programId = new web3.PublicKey('F76mQ6wUu1sq4zkEuACCAWLD9E6EJd66BfokCzWDwHWo')
) {
  const [data] = likePostStruct.serialize({
    instructionDiscriminator: likePostInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.blogPostAuthority,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.post,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.authority,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.systemProgram ?? web3.SystemProgram.programId,
      isWritable: false,
      isSigner: false,
    },
  ];

  if (accounts.anchorRemainingAccounts != null) {
    for (const acc of accounts.anchorRemainingAccounts) {
      keys.push(acc);
    }
  }

  const ix = new web3.TransactionInstruction({
    programId,
    keys,
    data,
  });
  return ix;
}