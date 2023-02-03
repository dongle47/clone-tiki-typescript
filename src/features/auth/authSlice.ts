import { ResponseLogin } from './../../models/common';
import { RootState } from './../../app/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
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
        login(state){
            state.logging = true
        },
        loginSuccess(state, action:PayloadAction<ResponseLogin>){
            state.logging = false
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
        },
        loginFailed(state){
            state.logging = false
        },

        updateSuccess(state, action){
            state.user = action.payload.newUser
        },

        logout(state){
            state.logging = false
            state.accessToken = ""
            state.user = null
        }
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