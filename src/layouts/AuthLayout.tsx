import { Navigate, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useMeQuery } from '../services/AuthApi';
import { removeToken } from '../store/slices/AuthSlice';
import { config_app } from '../../config';

export default function MainLayout() {
    const auth_token = useAppSelector(state => state.auth.auth_token);
    const dispatch = useAppDispatch();

    const { isLoading, isError } = useMeQuery(undefined, {
        skip: auth_token === null,
    });

    if (auth_token !== null) {
        return <Navigate to={`/${config_app.MANAGER_PANEL}`} replace />;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        dispatch(removeToken());
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="container mx-auto py-5 h-screen flex items-center justify-center flex-col">
                <Outlet />
            </div>
        </div>
    );
}