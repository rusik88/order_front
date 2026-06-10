import { createApi } from '@reduxjs/toolkit/query/react';
import { API_APP } from '../router/routes';
import { baseQueryApp } from './BaseAppApi.ts';

export const AuthApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryApp,
    endpoints: builder => ({
        login: builder.mutation({
            query: data => ({
                url: API_APP.LOGIN,
                method: 'POST',
                body: data,
            }),
        }),

        registration: builder.mutation({
            query: data => ({
                url: API_APP.REGISTER,
                method: 'POST',
                body: data,
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url: API_APP.LOGOUT,
                method: 'POST',
            }),
        }),

        me: builder.query({
            query: () => API_APP.ME,
        }),
    }),
});

export const {
    useLoginMutation,
    useRegistrationMutation,
    useLogoutMutation,
    useMeQuery,
} = AuthApi;

