import {
  Connection,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from '@solana/web3.js';
import {
  createCreatePostInstruction,
  createDeletePostInstruction,
  createInitUserProfileInstruction,
  createLikePostInstruction,
  Post,
  PROGRAM_ID,
  UserProfile,
} from './sdk/src';
import {
  MAX_CONTENT_LENGTH,
  MAX_TITLE_LENGTH,
  POST_MAX_SIZE,
  USER_PROFILE_MAX_SIZE,
} from './constants';
import type { FeedEntry } from './types';
import { bignumToNumber, getPostPDA, getUserProfilePDA } from './utils';

export class BlogService {
  constructor(private connection: Connection) {
    this.connection = connection;
  }

  public async getUserProfile(
    authority: PublicKey
  ): Promise<UserProfile | undefined> {
    const userProfile = await UserProfile.gpaBuilder(PROGRAM_ID)
      .dataSize(USER_PROFILE_MAX_SIZE)
      .addFilter('authority', authority)
      .run(this.connection);

    if (userProfile.length > 0) {
      return UserProfile.fromAccountInfo(userProfile[0].account)[0];
    }
    return undefined;
  }

  public async getPostsByUser(authority: PublicKey): Promise<Post[]> {
    const posts = await Post.gpaBuilder(PROGRAM_ID)
      .dataSize(POST_MAX_SIZE)
      .addFilter('authority', authority)
      .run(this.connection);

    return posts
      .map((post) => {
        return Post.fromAccountInfo(post.account)[0];
      })
      .sort((a, b) => {
        return bignumToNumber(b.createdAt) - bignumToNumber(a.createdAt);
      });
  }

  public async getFeedEntries(): Promise<FeedEntry[]> {
    const posts = await Post.gpaBuilder(PROGRAM_ID)
      .dataSize(POST_MAX_SIZE)
      .run(this.connection);

    const userProfiles = (
      await UserProfile.gpaBuilder(PROGRAM_ID)
        .dataSize(USER_PROFILE_MAX_SIZE)
        .run(this.connection)
    ).map((userProfile) => {
      return UserProfile.fromAccountInfo(userProfile.account)[0];
    });

    return posts
      .map((post) => {
        const postData = Post.fromAccountInfo(post.account)[0];
        const userProfile = userProfiles.find((userProfile) => {
          return (
            userProfile.authority.toString() === postData.authority.toString()
          );
        });
        return {
          postAddress: post.pubkey,
          ...postData,
          ...userProfile,
        } as FeedEntry;
      })
      .sort((a, b) => {
        return bignumToNumber(b.createdAt) - bignumToNumber(a.createdAt);
      });
  }

  public async getAllUserProfiles(): Promise<UserProfile[]> {
    const userProfileAccounts = await UserProfile.gpaBuilder(PROGRAM_ID)
      .dataSize(USER_PROFILE_MAX_SIZE)
      .run(this.connection);

    const userProfiles = userProfileAccounts.map((userProfile) => {
      return UserProfile.fromAccountInfo(userProfile.account)[0];
    });
    return userProfiles;
  }

  public async getPost(postAddress: PublicKey): Promise<Post> {
    const post = await Post.fromAccountAddress(
      this.connection,
      new PublicKey(postAddress)
    );
    return post;
  }

  public async createPostIx({
    authority,
    title,
    content,
  }: {
    authority: PublicKey;
    title: string;
    content: string;
  }): Promise<TransactionInstruction> {
    if (title.length > MAX_TITLE_LENGTH) {
      throw new Error(
        `Title is too long, max length is ${MAX_TITLE_LENGTH} characters`
      );
    }
    if (content.length > MAX_CONTENT_LENGTH) {
      throw new Error(
        `Content is too long, max length is ${MAX_CONTENT_LENGTH} characters`
      );
    }

    const userProfile = getUserProfilePDA(authority);

    const userProfileData = await UserProfile.fromAccountAddress(
      this.connection,
      userProfile
    );

    const post = getPostPDA(userProfileData.createdPostsCount, authority);

    const ix = createCreatePostInstruction(
      {
        authority: authority,
        post: post,
        userProfile: userProfile,
        systemProgram: SystemProgram.programId,
      },
      {
        title: title,
        content: content,
      }
    );

    return ix;
  }

  public async createUserProfileIx({
    authority,
    twitterHandle,
  }: {
    authority: PublicKey;
    twitterHandle: string;
  }) {
    const userProfile = getUserProfilePDA(authority);

    const ix = createInitUserProfileInstruction(
      {
        authority: authority,
        systemProgram: SystemProgram.programId,
        userProfile: userProfile,
      },
      { twitterHandle: twitterHandle }
    );

    return ix;
  }

  public async createLikePostIx({
    authority,
    post,
  }: {
    authority: PublicKey;
    post: PublicKey;
  }) {
    const postData = await Post.fromAccountAddress(this.connection, post);

    const bloggerUserProfile = getUserProfilePDA(postData.authority);

    const userProfileData = await UserProfile.fromAccountAddress(
      this.connection,
      bloggerUserProfile
    );

    const likePostIx = createLikePostInstruction(
      {
        authority: authority,
        post: post,
        blogPostAuthority: userProfileData.authority,
        systemProgram: SystemProgram.programId,
      },
      {
        postCount: postData.postCount,
      }
    );

    return likePostIx;
  }

  public async createDeletePostIx({
    authority,
    post,
  }: {
    authority: PublicKey;
    post: PublicKey;
  }) {
    const postData = await Post.fromAccountAddress(this.connection, post);

    const userProfile = getUserProfilePDA(authority);

    const deletePostIx = createDeletePostInstruction(
      {
        authority: authority,
        post: post,
        systemProgram: SystemProgram.programId,
      },
      {
        postCount: postData.postCount,
      }
    );

    return deletePostIx;
  }
}
