import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './slices/AuthSlice';
import AlertReducer from './slices/AlertSlice';
import { AuthApi } from '../services/AuthApi.ts';

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        alert: AlertReducer,
        [AuthApi.reducerPath]: AuthApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(AuthApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch