import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './slices/AuthSlice';
import AlertReducer from './slices/AlertSlice';
import { AuthApi } from '../services/AuthApi.ts';
import { RolesApi } from '../services/RolesApi.ts';

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        alert: AlertReducer,
        [AuthApi.reducerPath]: AuthApi.reducer,
        [RolesApi.reducerPath]: RolesApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .concat(AuthApi.middleware)
        .concat(RolesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch