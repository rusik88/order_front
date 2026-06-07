import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from '../layouts/AuthLayout';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage';
import MainLayout from '../layouts/MainLayout';
import DashboardPage from '../pages/manager/DashboardPage.tsx';
import OrderListPage from '../pages/manager/orders/OrderListPage.tsx';
import OrderCreatePage from '../pages/manager/orders/OrderCreatePage.tsx';
import { config_app } from '../../config';
import { PUBLIC_ROUTES, PRIVATE_ROUTES, ERROR_ROUTES } from './routes';
import ForbiddenPage from '../pages/ForbiddenPage';
import ErrorPage from '../pages/ErrorPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthLayout />,

        children: [
            {
                index: true,
                element: <LoginPage />,
            },
            {
                path: PUBLIC_ROUTES.REGISTER,
                element: <RegisterPage />,
            },
        ],

        errorElement: <NotFoundPage />,
    },
    {
        path: `/${config_app.MANAGER_PANEL}`,
        element: <MainLayout />,

        children: [
            {
                index: true,
                element: <DashboardPage />,
            },
            {
                path: PRIVATE_ROUTES.ORDERS_LIST,
                element: <OrderListPage />,
            },
            {
                path: PRIVATE_ROUTES.ORDERS_CREATE,
                element: <OrderCreatePage />,
            }
        ],
    },
    {
        path: `/${ERROR_ROUTES.ERROR_403}`,
        element: <ForbiddenPage />,
    },
    {
        path: `/${ERROR_ROUTES.ERROR_404}`,
        element: <NotFoundPage />,
    },
    {
        path: `/${ERROR_ROUTES.ERROR_500}`,
        element: <ErrorPage />,
    }
]);