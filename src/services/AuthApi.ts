import { createApi } from '@reduxjs/toolkit/query/react';
import { API_APP } from '../router/routes';
import { baseQueryWithAuth } from './BaseAppApi.ts';

export const AuthApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithAuth,
    endpoints: builder => ({
        login: builder.mutation({
            query: data => ({
                url: API_APP.LOGIN,
                method: 'POST',
                body: data,
            }),
        }),

        register: builder.mutation({
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
    useRegisterMutation,
    useLogoutMutation,
    useMeQuery,
} = AuthApi;

