import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './slices/AuthSlice';
import AlertReducer from './slices/AlertSlice';
import { AuthApi } from '../services/AuthApi';
import { RolesApi } from '../services/RolesApi';
import { SettingsApi } from '../services/SettingsApi';
import { UsersApi } from '../services/UsersApi';
import { OrderStatusesApi } from '../services/OrderStatusesApi';

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        alert: AlertReducer,
        [AuthApi.reducerPath]: AuthApi.reducer,
        [RolesApi.reducerPath]: RolesApi.reducer,
        [SettingsApi.reducerPath]: SettingsApi.reducer,
        [UsersApi.reducerPath]: UsersApi.reducer,
        [OrderStatusesApi.reducerPath]: OrderStatusesApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .concat(AuthApi.middleware)
        .concat(RolesApi.middleware)
        .concat(SettingsApi.middleware)
        .concat(UsersApi.middleware)
        .concat(OrderStatusesApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch