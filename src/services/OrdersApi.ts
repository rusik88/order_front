import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryApp } from './BaseAppApi';
import { API_APP } from '../router/routes';
import type { IRoleGetAllQuery } from '../interfaces/manager/RolesInterfaces.ts';

export const OrdersApi = createApi({
    reducerPath: 'OrderApi',
    baseQuery: baseQueryApp,
    tagTypes: ['Order'],

    endpoints: builder => ({
        getOrders: builder.query({
            query: (params: IRoleGetAllQuery) => ({
                url: API_APP.ORDERS,
                method: 'GET',
                params,
            }),
            providesTags: ['Order'],
        }),

        getOrder: builder.query({
            query: (id: number) => ({
                url: `${API_APP.ORDERS}/${id}`,
                method: 'GET',
            }),
            providesTags: ['Order'],
        }),

        createOrder: builder.mutation({
            query: data => ({
                url: API_APP.ORDERS,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Order'],
        }),

        updateOrder: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `${API_APP.ORDERS}/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Order'],
        }),

        deleteOrder: builder.mutation({
            query: (id: number) => ({
                url: `${API_APP.ORDERS}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Order'],
        }),
    }),
});

export const {
    useGetOrdersQuery,
    useGetOrderQuery,
    useCreateOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
} = OrdersApi;