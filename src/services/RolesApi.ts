import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryApp } from './BaseAppApi';
import { API_APP } from '../router/routes';
import type { IRoleGetAllQuery } from '../interfaces/manager/RolesInterfaces.ts';

export const RolesApi = createApi({
    reducerPath: 'rolesApi',
    baseQuery: baseQueryApp,
    tagTypes: ['Roles'],

    endpoints: builder => ({
        getRoles: builder.query({
            query: (params: IRoleGetAllQuery) => ({
                url: API_APP.ROLES,
                method: 'GET',
                params,
            }),
            providesTags: ['Roles'],
        }),
        
        getRole: builder.query({
            query: (id: number) => ({
                url: `${API_APP.ROLES}/${id}`,
                method: 'GET',
            }),
            providesTags: ['Roles'],
        }),

        createRole: builder.mutation({
            query: data => ({
                url: API_APP.ROLES,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Roles'],
        }),

        updateRole: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `${API_APP.ROLES}/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Roles'],
        }),

        deleteRole: builder.mutation({
            query: (id: number) => ({
                url: `${API_APP.ROLES}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Roles'],
        }),
    }),
});

export const {
    useGetRolesQuery,
    useGetRoleQuery,
    useCreateRoleMutation,
    useUpdateRoleMutation,
    useDeleteRoleMutation,
} = RolesApi;