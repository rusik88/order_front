import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryApp} from './BaseAppApi.ts';
import { API_APP } from '../router/routes.ts';
import type { ISettingsQuery } from '../interfaces/manager/SettingsInterfaces';

export const SettingsApi = createApi({
    reducerPath: 'settingsApi',
    baseQuery: baseQueryApp,
    tagTypes: ['Settings'],

    endpoints: builder => ({

        getSettings: builder.query({
            query: (params: ISettingsQuery) => ({
                url: API_APP.SETTINGS,
                method: 'GET',
                params,
            }),
            providesTags: ['Settings'],
        }),

        updateSettings: builder.mutation({
            query: ({ ...data }) => ({
                url: API_APP.SETTINGS,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Settings'],
        }),

    })
});

export const {
    useGetSettingsQuery,
    useUpdateSettingsMutation
} = SettingsApi;