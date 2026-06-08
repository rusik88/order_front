import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './BaseAppApi';
import { API_APP } from '../router/routes';

export const RolesApi = createApi({
    reducerPath: 'rolesApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['Roles'],

    endpoints: builder => ({
        getRoles: builder.query({
            query: (params?: { page?: number; per_page?: number }) => ({
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