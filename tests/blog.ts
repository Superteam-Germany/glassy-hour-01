import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Blog } from '../target/types/blog';
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey';
import { POST_TAG, USER_PROFILE_TAG } from './constants';
import { intToU16Buffer } from './utils';
import { expect } from 'chai';

describe('blog', () => {
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.Blog as Program<Blog>;

  it('Initialize User Profile', async () => {
    const [userProfile] = findProgramAddressSync(
      [USER_PROFILE_TAG, program.provider.publicKey.toBuffer()],
      program.programId
    );

    const tx = await program.methods
      .initUserProfile('twitter_handle')
      .accounts({
        userProfile: userProfile,
        authority: program.provider.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    console.log(tx);

    const userProfileAccount = await program.account.userProfile.fetch(
      userProfile
    );
    expect(userProfileAccount.twitterHandle).to.equal('twitter_handle');
  });

  it('Create Post', async () => {
    const [userProfile] = findProgramAddressSync(
      [USER_PROFILE_TAG, program.provider.publicKey.toBuffer()],
      program.programId
    );

    const userProfileData = await program.account.userProfile.fetch(
      userProfile
    );

    const [post] = findProgramAddressSync(
      [
        POST_TAG,
        intToU16Buffer(userProfileData.createdPostsCount),
        program.provider.publicKey.toBuffer(),
      ],
      program.programId
    );

    const tx = await program.methods
      .createPost('Title', 'Content')
      .accounts({
        userProfile: userProfile,
        post: post,
        authority: program.provider.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    console.log(tx);

    const postData = await program.account.post.fetch(post);
    expect(postData.title).to.equal('Title');
    expect(postData.content).to.equal('Content');
  });

  it('Like Post', async () => {
    const [userProfile] = findProgramAddressSync(
      [USER_PROFILE_TAG, program.provider.publicKey.toBuffer()],
      program.programId
    );

    const userProfileData = await program.account.userProfile.fetch(
      userProfile
    );

    const [post] = findProgramAddressSync(
      [
        POST_TAG,
        intToU16Buffer(userProfileData.createdPostsCount - 1),
        program.provider.publicKey.toBuffer(),
      ],
      program.programId
    );

    const tx = await program.methods
      .likePost(userProfileData.createdPostsCount - 1)
      .accounts({
        blogPostAuthority: userProfileData.authority,
        post: post,
        authority: program.provider.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    console.log(tx);

    const postData = await program.account.post.fetch(post);
    expect(postData.likesCount).to.equal(1);
  });

  it('Delete Post', async () => {
    const [userProfile] = findProgramAddressSync(
      [USER_PROFILE_TAG, program.provider.publicKey.toBuffer()],
      program.programId
    );

    const userProfileData = await program.account.userProfile.fetch(
      userProfile
    );

    const [post] = findProgramAddressSync(
      [
        POST_TAG,
        intToU16Buffer(userProfileData.createdPostsCount - 1),
        program.provider.publicKey.toBuffer(),
      ],
      program.programId
    );

    const tx = await program.methods
      .deletePost(userProfileData.createdPostsCount - 1)
      .accounts({
        post: post,
        authority: program.provider.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    console.log(tx);

    const postData = await program.account.post.fetchNullable(post);
    expect(postData).to.equal(null);
  });
});
