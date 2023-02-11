/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as web3 from '@solana/web3.js'
import * as beetSolana from '@metaplex-foundation/beet-solana'
import * as beet from '@metaplex-foundation/beet'

/**
 * Arguments used to create {@link UserProfile}
 * @category Accounts
 * @category generated
 */
export type UserProfileArgs = {
  authority: web3.PublicKey
  twitterHandle: string
  createdPostsCount: number
}

export const userProfileDiscriminator = [32, 37, 119, 205, 179, 180, 13, 194]
/**
 * Holds the data for the {@link UserProfile} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
export class UserProfile implements UserProfileArgs {
  private constructor(
    readonly authority: web3.PublicKey,
    readonly twitterHandle: string,
    readonly createdPostsCount: number
  ) {}

  /**
   * Creates a {@link UserProfile} instance from the provided args.
   */
  static fromArgs(args: UserProfileArgs) {
    return new UserProfile(
      args.authority,
      args.twitterHandle,
      args.createdPostsCount
    )
  }

  /**
   * Deserializes the {@link UserProfile} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static fromAccountInfo(
    accountInfo: web3.AccountInfo<Buffer>,
    offset = 0
  ): [UserProfile, number] {
    return UserProfile.deserialize(accountInfo.data, offset)
  }

  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link UserProfile} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */
  static async fromAccountAddress(
    connection: web3.Connection,
    address: web3.PublicKey,
    commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig
  ): Promise<UserProfile> {
    const accountInfo = await connection.getAccountInfo(
      address,
      commitmentOrConfig
    )
    if (accountInfo == null) {
      throw new Error(`Unable to find UserProfile account at ${address}`)
    }
    return UserProfile.fromAccountInfo(accountInfo, 0)[0]
  }

  /**
   * Provides a {@link web3.Connection.getProgramAccounts} config builder,
   * to fetch accounts matching filters that can be specified via that builder.
   *
   * @param programId - the program that owns the accounts we are filtering
   */
  static gpaBuilder(
    programId: web3.PublicKey = new web3.PublicKey(
      'F76mQ6wUu1sq4zkEuACCAWLD9E6EJd66BfokCzWDwHWo'
    )
  ) {
    return beetSolana.GpaBuilder.fromStruct(programId, userProfileBeet)
  }

  /**
   * Deserializes the {@link UserProfile} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static deserialize(buf: Buffer, offset = 0): [UserProfile, number] {
    return userProfileBeet.deserialize(buf, offset)
  }

  /**
   * Serializes the {@link UserProfile} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */
  serialize(): [Buffer, number] {
    return userProfileBeet.serialize({
      accountDiscriminator: userProfileDiscriminator,
      ...this,
    })
  }

  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link UserProfile} for the provided args.
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   */
  static byteSize(args: UserProfileArgs) {
    const instance = UserProfile.fromArgs(args)
    return userProfileBeet.toFixedFromValue({
      accountDiscriminator: userProfileDiscriminator,
      ...instance,
    }).byteSize
  }

  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link UserProfile} data from rent
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   * @param connection used to retrieve the rent exemption information
   */
  static async getMinimumBalanceForRentExemption(
    args: UserProfileArgs,
    connection: web3.Connection,
    commitment?: web3.Commitment
  ): Promise<number> {
    return connection.getMinimumBalanceForRentExemption(
      UserProfile.byteSize(args),
      commitment
    )
  }

  /**
   * Returns a readable version of {@link UserProfile} properties
   * and can be used to convert to JSON and/or logging
   */
  pretty() {
    return {
      authority: this.authority.toBase58(),
      twitterHandle: this.twitterHandle,
      createdPostsCount: this.createdPostsCount,
    }
  }
}

/**
 * @category Accounts
 * @category generated
 */
export const userProfileBeet = new beet.FixableBeetStruct<
  UserProfile,
  UserProfileArgs & {
    accountDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['authority', beetSolana.publicKey],
    ['twitterHandle', beet.utf8String],
    ['createdPostsCount', beet.u16],
  ],
  UserProfile.fromArgs,
  'UserProfile'
)
