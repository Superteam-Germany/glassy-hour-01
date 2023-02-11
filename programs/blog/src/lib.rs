use {crate::instructions::*, anchor_lang::prelude::*};

pub mod constants;
pub mod errors;
pub mod instructions;
pub mod states;

declare_id!("F76mQ6wUu1sq4zkEuACCAWLD9E6EJd66BfokCzWDwHWo");

#[program]
pub mod blog {

    use super::*;

    pub fn init_user_profile(ctx: Context<InitUserProfile>, twitter_handle: String) -> Result<()> {
        init_user_profile::handler(ctx, twitter_handle)
    }

    pub fn create_post(ctx: Context<CreatePost>, title: String, content: String) -> Result<()> {
        create_post::handler(ctx, title, content)
    }

    pub fn delete_post(ctx: Context<DeletePost>, post_count: u16) -> Result<()> {
        delete_post::handler(ctx, post_count)
    }

    pub fn like_post(ctx: Context<LikePost>, post_count: u16) -> Result<()> {
        like_post::handler(ctx, post_count)
    }
}
