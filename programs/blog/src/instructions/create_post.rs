use {
    crate::{constants::*, errors::ErrorCode, states::*},
    anchor_lang::prelude::*,
};

#[derive(Accounts)]
pub struct CreatePost<'info> {
    #[account(
        // 1. Make the account mutable
        mut,
        // 2. Set the seeds to the user profile tag and the authority's pubkey
        seeds = [USER_PROFILE_TAG.as_ref(), authority.key.as_ref()],
        bump,
    )]
    pub user_profile: Account<'info, UserProfile>,
    
    #[account(
        // 1. initialize an account with these details:
        init,
        // 2. Set the seeds to the post tag, the created posts count (to give every post a unique seed) and the authority's pubkey
        seeds = [POST_TAG.as_ref(), &user_profile.created_posts_count.to_le_bytes(), authority.key.as_ref()],
        bump,
        // 3. Set the authority as the payer
        payer = authority, 
        // 4. Set the space to 8 (Anchor Boilerplate) + the max size of the UserProfile struct
        space = 8 + Post::MAX_SIZE,
    )]
    pub post: Account<'info, Post>, 

    // 5. Let's name the account that signs this transaction "authority"
    #[account(mut)] 
    pub authority: Signer<'info>,

    // 6. Anchor boilerplate
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<CreatePost>, title: String, content: String) -> Result<()> {
    let user_profile = &mut ctx.accounts.user_profile;
    let post = &mut ctx.accounts.post;

    if title.len() > MAX_TITLE_LENGTH {
        return Err(ErrorCode::TitleTooLong.into());
    }

    if content.len() > MAX_CONTENT_LENGTH {
        return Err(ErrorCode::ContentTooLong.into());
    }

    post.authority = *ctx.accounts.authority.key;
    post.title = title.to_string();
    post.content = content.to_string();
    post.post_count = user_profile.created_posts_count;
    post.likes_count = 0;
    post.created_at = Clock::get()?.unix_timestamp;

    user_profile.created_posts_count += 1;

    Ok(())
}