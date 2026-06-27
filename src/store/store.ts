import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './slices/AuthSlice';
import AlertReducer from './slices/AlertSlice';
import { AuthApi } from '../services/AuthApi';
import { RolesApi } from '../services/RolesApi';
import { SettingsApi } from '../services/SettingsApi';

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        alert: AlertReducer,
        [AuthApi.reducerPath]: AuthApi.reducer,
        [RolesApi.reducerPath]: RolesApi.reducer,
        [SettingsApi.reducerPath]: SettingsApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .concat(AuthApi.middleware)
        .concat(RolesApi.middleware)
        .concat(SettingsApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch