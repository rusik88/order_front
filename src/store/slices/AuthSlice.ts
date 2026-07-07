import { createSlice } from '@reduxjs/toolkit';
import type { AuthPayloadLoginInterface, AuthStateInterface } from '../../interfaces/auth/AuthStateInterface';
import type { IApiUser } from '../../interfaces/auth/AuthApiInterfaces';

const initialState: AuthStateInterface = {
    auth_token: null,
    user: null,
    user_role: null,
    user_permissions: []
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: {payload: AuthPayloadLoginInterface}) => {
            state.auth_token = action.payload.auth_token;
            state.user = action.payload.user;
            state.user_role = action.payload.user.role.slug;
            state.user_permissions = JSON.parse(action.payload.user.role.permissions);
            localStorage.setItem('auth_token', action.payload.auth_token);
        },

        setUser: (state, action: {payload: IApiUser}) => {
            state.user = action.payload;
            state.user_role = action.payload.role.slug;
            state.user_permissions = JSON.parse(action.payload.role.permissions);
        },

        removeToken: state => {
            state.auth_token = null;
            state.user = null;
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

export const { setAuth, removeToken, hydrateToken, setUser } = authSlice.actions;
export default authSlice.reducer;