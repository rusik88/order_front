import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryApp } from './BaseAppApi';
import { API_APP } from '../router/routes';
import type { IRoleGetAllQuery } from '../interfaces/manager/RolesInterfaces.ts';

export const OrderStatusesApi = createApi({
    reducerPath: 'orderStatusesApi',
    baseQuery: baseQueryApp,
    tagTypes: ['OrderStatuses'],

    endpoints: builder => ({
        getOrderStatuses: builder.query({
            query: (params: IRoleGetAllQuery) => ({
                url: API_APP.ORDER_STATUSES,
                method: 'GET',
                params,
            }),
            providesTags: ['OrderStatuses'],
        }),

        getOrderStatus: builder.query({
            query: (id: number) => ({
                url: `${API_APP.ORDER_STATUSES}/${id}`,
                method: 'GET',
            }),
            providesTags: ['OrderStatuses'],
        }),

        createOrderStatus: builder.mutation({
            query: data => ({
                url: API_APP.ORDER_STATUSES,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['OrderStatuses'],
        }),

        updateOrderStatus: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `${API_APP.ORDER_STATUSES}/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['OrderStatuses'],
        }),

        deleteOrderStatus: builder.mutation({
            query: (id: number) => ({
                url: `${API_APP.ORDER_STATUSES}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['OrderStatuses'],
        }),
    }),
});

export const {
    useGetOrderStatusesQuery,
    useGetOrderStatusQuery,
    useCreateOrderStatusMutation,
    useUpdateOrderStatusMutation,
    useDeleteOrderStatusMutation,
} = OrderStatusesApi;