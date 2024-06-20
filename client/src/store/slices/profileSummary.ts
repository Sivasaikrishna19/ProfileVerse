// src/store/slices/userSlice.ts
import { IProfileSummary } from '@/interfaces/profileSummary';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  profileSummary: IProfileSummary;
}

const initialState: UserState = {
  profileSummary: {
    login: '',
    id: 0,
    node_id: '',
    avatar_url: '',
    gravatar_id: '',
    url: '',
    html_url: '',
    followers_url: '',
    following_url: '',
    gists_url: '',
    starred_url: '',
    subscriptions_url: '',
    organizations_url: '',
    repos_url: '',
    events_url: '',
    received_events_url: '',
    type: '',
    site_admin: false,
    name: null,
    company: null,
    blog: '',
    location: null,
    email: null,
    hireable: null,
    bio: null,
    twitter_username: null,
    public_repos: 0,
    public_gists: 0,
    followers: 0,
    following: 0,
    created_at: '',
    updated_at: '',
    private_gists: 0,
    total_private_repos: 0,
    owned_private_repos: 0,
    disk_usage: 0,
    collaborators: 0,
    two_factor_authentication: false,
    plan: {
      name: '',
      space: 0,
      collaborators: 0,
      private_repos: 0,
    },
  },
};

const profileSummarySlice = createSlice({
  name: 'profileSummary',
  initialState,
  reducers: {
    setProfileSummary(state, action: PayloadAction<IProfileSummary>) {
      state.profileSummary = action.payload;
    },

  },
});

export const { setProfileSummary} = profileSummarySlice.actions;
export default profileSummarySlice.reducer;
