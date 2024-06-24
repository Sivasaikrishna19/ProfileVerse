import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthenticationState {
    accessToken: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthenticationState = {
    accessToken: null,
    isAuthenticated: false,
};

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setAccessToken(state, action: PayloadAction<string>) {
            state.accessToken = action.payload;
            state.isAuthenticated = true;
        },
        clearAccessToken(state) {
            state.accessToken = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setAccessToken, clearAccessToken } = authenticationSlice.actions;

export default authenticationSlice.reducer;
