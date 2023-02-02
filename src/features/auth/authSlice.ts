import { RootState } from './../../app/store';
import { createSlice } from '@reduxjs/toolkit';
import { User } from 'models';

export interface AuthState{
    accessToken: string;
    logging: boolean;
    user: User | null;
}

const initialState: AuthState = {
    accessToken: "",
    logging: false,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{

    }
})

//actions
export const authActions = authSlice.actions

//selector
export const selectUser = (state:RootState) => state.auth.user
export const selectAccessToken = (state: RootState) => state.auth.accessToken
export const selectLogging = (state: RootState) => state.auth.logging

//reducer
const authReducer = authSlice.reducer
export default authReducer