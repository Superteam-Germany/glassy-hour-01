export * from './Post'
export * from './UserProfile'

import { UserProfile } from './UserProfile'
import { Post } from './Post'

export const accountProviders = { UserProfile, Post }
