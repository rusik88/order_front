import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryApp } from './BaseAppApi';
import { API_APP } from '../router/routes';
import type { IUserGetAllQuery } from '../interfaces/manager/UsersInterfaces';

export const UsersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: baseQueryApp,
    tagTypes: ['Users'],

    endpoints: builder => ({
        getUsers: builder.query({
            query: (params: IUserGetAllQuery) => ({
                url: API_APP.USERS,
                method: 'GET',
                params,
            }),
            providesTags: ['Users'],
        }),

        getUser: builder.query({
            query: (id: number) => ({
                url: `${API_APP.USERS}/${id}`,
                method: 'GET',
            }),
            providesTags: ['Users'],
        }),

        createUser: builder.mutation({
            query: data => ({
                url: API_APP.USERS,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Users'],
        }),

        updateUser: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `${API_APP.USERS}/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Users'],
        }),

        deleteUser: builder.mutation({
            query: (id: number) => ({
                url: `${API_APP.USERS}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users'],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = UsersApi;