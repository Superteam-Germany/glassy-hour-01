use {
    crate::{constants::*, errors::ErrorCode, states::*},
    anchor_lang::prelude::*,
};

#[derive(Accounts)]
pub struct InitUserProfile<'info> {
    #[account(
        // 1. initialize an account with these details:
        init,
        // 2. Set the seeds to the raffle creator profile tag and the authority's pubkey
        seeds = [USER_PROFILE_TAG.as_ref(), authority.key.as_ref()],
        bump,
        // 3. Set the authority as the payer
        payer = authority, 
        // 4. Set the space to 8 (Anchor Boilerplate) + the max size of the UserProfile struct
        space = 8 + UserProfile::MAX_SIZE,
    )]
    pub user_profile: Account<'info, UserProfile>, 

    // 5. Let's name the account that signs this transaction "authority"
    #[account(mut)] 
    pub authority: Signer<'info>,

    // 6. Anchor boilerplate
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<InitUserProfile>,twitter_handle: String) -> Result<()> {
    let user_profile = &mut ctx.accounts.user_profile;

    if twitter_handle.len() > MAX_TWITTER_HANDLE_LENGTH {
        return Err(ErrorCode::TwitterHandleTooLong.into());
    }

    user_profile.authority = *ctx.accounts.authority.key;
    user_profile.created_posts_count = 0;
    user_profile.twitter_handle = twitter_handle;

    Ok(())
}
