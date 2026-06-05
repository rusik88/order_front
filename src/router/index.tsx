import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from '../layouts/AuthLayout';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage';
import MainLayout from '../layouts/MainLayout';
import DashboardPage from '../pages/manager/DashboardPage.tsx';
import OrderListPage from '../pages/manager/orders/OrderListPage.tsx';
import OrderCreatePage from '../pages/manager/orders/OrderCreatePage.tsx';

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
                path: 'register',
                element: <RegisterPage />,
            },
        ],

        errorElement: <NotFoundPage />,
    },
    {
        path: '/manager',
        element: <MainLayout />,

        children: [
            {
                index: true,
                element: <DashboardPage />,
            },
            {
                path: 'order-list',
                element: <OrderListPage />,
            },
            {
                path: 'order-create',
                element: <OrderCreatePage />,
            }
        ],
    }
]);