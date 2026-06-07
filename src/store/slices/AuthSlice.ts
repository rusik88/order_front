import { createSlice } from '@reduxjs/toolkit';
import type { AuthPayloadLoginInterface, AuthStateInterface } from '../../interfaces/auth/AuthStateInterface';
import type { IApiUser } from '../../interfaces/auth/AuthApiInterfaces';

const initialState: AuthStateInterface = {
    auth_token: null,
    user: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: {payload: AuthPayloadLoginInterface}) => {
            state.auth_token = action.payload.auth_token;
            state.user = action.payload.user;
            localStorage.setItem('auth_token', action.payload.auth_token);
        },

        setUser: (state, action: {payload: IApiUser}) => {
            state.user = action.payload;
        },

        removeToken: state => {
            state.auth_token = null;
            localStorage.removeItem('auth_token');
        },

        hydrateToken: state => {
            const token = localStorage.getItem('auth_token');

            if (token) {
                state.auth_token = token;
            }
        },
    },
});

export const { setToken, removeToken, hydrateToken, setUser } = authSlice.actions;
export default authSlice.reducer;