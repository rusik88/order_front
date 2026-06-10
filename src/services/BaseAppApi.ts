import {
    fetchBaseQuery,
    type BaseQueryFn,
    type FetchArgs,
    type FetchBaseQueryError
} from '@reduxjs/toolkit/query';
import { config_app } from '../../config.ts';
import { ERROR_ROUTES, PUBLIC_ROUTES } from '../router/routes';
import { removeToken } from '../store/slices/AuthSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: config_app.API_URL,
    credentials: 'include',
    prepareHeaders: headers => {
        const token = localStorage.getItem('auth_token');

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        headers.set('Accept', 'application/json');

        return headers;
    },
});

export const baseQueryApp: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error) {
        switch (result.error.status) {
            case 401:
                api.dispatch(removeToken());
                window.location.href = PUBLIC_ROUTES.LOGIN;
                break;

            case 403:
                window.location.href = ERROR_ROUTES.ERROR_403;
                break;

            case 404:
                window.location.href = ERROR_ROUTES.ERROR_404;
                break;

            case 500:
                window.location.href = ERROR_ROUTES.ERROR_500;
                break;

            default:
                break;
        }
    }

    return result;
};