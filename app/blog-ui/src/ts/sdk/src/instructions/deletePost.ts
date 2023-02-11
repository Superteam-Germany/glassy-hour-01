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
 * @category DeletePost
 * @category generated
 */
export type DeletePostInstructionArgs = {
  postCount: number;
};
/**
 * @category Instructions
 * @category DeletePost
 * @category generated
 */
export const deletePostStruct = new beet.BeetArgsStruct<
  DeletePostInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['postCount', beet.u16],
  ],
  'DeletePostInstructionArgs'
);
/**
 * Accounts required by the _deletePost_ instruction
 *
 * @property [_writable_] post
 * @property [_writable_, **signer**] authority
 * @category Instructions
 * @category DeletePost
 * @category generated
 */
export type DeletePostInstructionAccounts = {
  post: web3.PublicKey;
  authority: web3.PublicKey;
  systemProgram?: web3.PublicKey;
  anchorRemainingAccounts?: web3.AccountMeta[];
};

export const deletePostInstructionDiscriminator = [
  208, 39, 67, 161, 55, 13, 153, 42,
];

/**
 * Creates a _DeletePost_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category DeletePost
 * @category generated
 */
export function createDeletePostInstruction(
  accounts: DeletePostInstructionAccounts,
  args: DeletePostInstructionArgs,
  programId = new web3.PublicKey('F76mQ6wUu1sq4zkEuACCAWLD9E6EJd66BfokCzWDwHWo')
) {
  const [data] = deletePostStruct.serialize({
    instructionDiscriminator: deletePostInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
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
