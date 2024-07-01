// src/store/slices/userSlice.ts
import { IProfileSummary } from '@/interfaces/profileSummary.interface';
import { IRepository } from '@/interfaces/repo.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  profileSummary: IProfileSummary;
  repos: Array<IRepository>;
}

const initialState: UserState = {
  profileSummary: {} as IProfileSummary,
  repos:[]
};

const profileSummarySlice = createSlice({
  name: 'profileSummary',
  initialState,
  reducers: {
    setProfileSummary(state, action: PayloadAction<IProfileSummary>) {
      state.profileSummary = action.payload;
    },
    setRepositories(state,action: PayloadAction<Array<IRepository>>){
      state.repos = action.payload;
    }

  },
});

export const { setProfileSummary,setRepositories} = profileSummarySlice.actions;
export default profileSummarySlice.reducer;
