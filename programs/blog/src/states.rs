use {crate::constants::*, anchor_lang::prelude::*};

#[account]
#[derive(Default)]
pub struct UserProfile {
    pub authority: Pubkey,
    pub twitter_handle: String,
    pub created_posts_count: u16,
}

impl UserProfile {
    pub const MAX_SIZE: usize = 32 // Authority
    + 4 + MAX_TWITTER_HANDLE_LENGTH // Twitter handle (15 characters is max length of a twitter handle)
    + 2; // Posts count
}

#[account]
#[derive(Default)]
pub struct Post {
    pub authority: Pubkey,
    pub title: String,
    pub content: String,
    pub post_count: u16,
    pub likes_count: u16,
    pub created_at: i64,
}

impl Post {
    pub const MAX_SIZE: usize = 32 // Authority
    + 4 + MAX_TITLE_LENGTH // Title
    + 4 + MAX_CONTENT_LENGTH // Content
    + 2 // Post count
    + 2 // Likes count
    + 8; // Created at
}
