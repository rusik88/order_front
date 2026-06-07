import { Navigate, Outlet } from 'react-router-dom';
import { useMeQuery } from '../services/AuthApi';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { removeToken } from '../store/slices/AuthSlice';

import HeaderComponent from '../components/manager/header/HeaderComponent';
import FooterComponent from '../components/manager/footer/FooterComponent';
import SidebarComponent from '../components/manager/sidebar/SidebarComponent';
import { PUBLIC_ROUTES } from '../router/routes.ts';
import AlertComponent from '../components/common/AlertComponent';

export default function MainLayout() {
    const auth_token = useAppSelector(state => state.auth.auth_token);
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();

    const { isLoading, isError } = useMeQuery(undefined, {
        skip: !auth_token || user !== null,
    });

    if (!auth_token) {
        return <Navigate to={PUBLIC_ROUTES.LOGIN} replace />;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        dispatch(removeToken());
        return <Navigate to={PUBLIC_ROUTES.LOGIN} replace />;
    }

    return (
        <>
            <HeaderComponent />
            <div className="flex flex-1">
                <SidebarComponent />
                <main className="flex-1 p-8">
                    <div className="rounded-3xl border border-white/10 bg-white/5  backdrop-blur-md p-8 shadow-2xl">
                        <Outlet />
                    </div>
                </main>
            </div>
            <FooterComponent />
            <AlertComponent />
        </>
    );
}