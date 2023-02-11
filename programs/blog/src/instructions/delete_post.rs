use {
    crate::{constants::*, errors::ErrorCode, states::*},
    anchor_lang::prelude::*,
};

#[derive(Accounts)]
#[instruction(post_count: u16)]
pub struct DeletePost<'info> {
    #[account(
        // 1. Make the account mutable so we can close it
        mut,
        // 2. Set the seeds to the post tag and the authority's pubkey
        seeds = [POST_TAG.as_ref(), post_count.to_le_bytes().as_ref(), authority.key.as_ref()],
        bump,
        // 3. Set the constraint that the authority must be the same as the post's authority
        constraint = post.authority == *authority.key @ ErrorCode::Unauthorized,
        // 4. Close the account and send the lamports to the authority
        close = authority,
    )]
    pub post: Account<'info, Post>,

    // 5. Let's name the account that signs this transaction "authority"
    #[account(mut)]
    pub authority: Signer<'info>,

    // 6. Anchor boilerplate
    pub system_program: Program<'info, System>,
}

pub fn handler(_: Context<DeletePost>, post_count: u16) -> Result<()> {
    Ok(())
}
