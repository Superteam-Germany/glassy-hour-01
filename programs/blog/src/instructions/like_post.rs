use {
    crate::{constants::*, states::*},
    anchor_lang::prelude::*,
};

#[derive(Accounts)]
#[instruction(post_count: u16)]
pub struct LikePost<'info> {
    // 1. Get the blog post authority's account
    // The CHECK comment below is needed to prevent the compiler from complaining
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub blog_post_authority: AccountInfo<'info>,

    #[account(
        // 2. Make the account mutable so we can update the likes count
        mut,
        // 3. Set the seeds to the post tag and the pubkey of the blog post authority
        seeds = [POST_TAG.as_ref(), post_count.to_le_bytes().as_ref(), blog_post_authority.key.as_ref()],
        bump,
    )]
    pub post: Account<'info, Post>,

    // 4. Let's name the account that signs this transaction "authority"
    #[account(mut)]
    pub authority: Signer<'info>,

    // 5. Anchor boilerplate
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<LikePost>, post_count: u16) -> Result<()> {
    let post = &mut ctx.accounts.post;

    post.likes_count += 1;

    Ok(())
}
