import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryApp} from './BaseAppApi.ts';
import { API_APP } from '../router/routes.ts';

export const SettingsApi = createApi({
    reducerPath: 'settingsApi',
    baseQuery: baseQueryApp,
    tagTypes: ['Settings'],

    endpoints: builder => ({

        getSettings: builder.query({
            query: () => ({
                url: API_APP.SETTINGS,
                method: 'GET'
            }),
            providesTags: ['Settings'],
        }),

        getSetting: builder.query({
            query: (slug: string) => ({
                url: `${API_APP.SETTINGS}/${slug}`,
                method: 'GET'
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
    useGetSettingQuery,
    useUpdateSettingsMutation
} = SettingsApi;