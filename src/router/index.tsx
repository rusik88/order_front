import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from '../layouts/AuthLayout';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage';
import MainLayout from '../layouts/MainLayout';
import DashboardPage from '../pages/manager/DashboardPage';
import { config_app } from '../../config';
import  { PUBLIC_ROUTES, ERROR_ROUTES, ENTITY_ROUTES } from './routes';
import ForbiddenPage from '../pages/ForbiddenPage';
import ErrorPage from '../pages/ErrorPage';
import RoleListPage from '../pages/manager/roles/RoleListPage';
import RoleCreatePage from '../pages/manager/roles/RoleCreatePage';
import RoleUpdatePage from '../pages/manager/roles/RoleUpdatePage';
import OrderListPage from '../pages/manager/orders/OrderListPage';
import OrderCreatePage from '../pages/manager/orders/OrderCreatePage';
import SettingsPage from '../pages/manager/settings/SettingsPage';
import UserListPage from '../pages/manager/users/UserListPage';
import UserUpdatePage from '../pages/manager/users/UserUpdatePage';
import UserCreatePage from '../pages/manager/users/UserCreatePage';

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
                path: ENTITY_ROUTES.SETTINGS,
                element: <SettingsPage />,
            },
            {
                path: ENTITY_ROUTES.ROLES,
                children: [
                    {
                        index: true,
                        element: <RoleListPage />
                    },
                    {
                        path: 'create',
                        element: <RoleCreatePage />
                    },
                    {
                        path: 'edit/:id',
                        element: <RoleUpdatePage />
                    }
                ]
            },
            {
                path: ENTITY_ROUTES.USERS,
                children: [
                    {
                        index: true,
                        element: <UserListPage />
                    },
                    {
                        path: 'create',
                        element: <UserCreatePage />
                    },
                    {
                        path: 'edit/:id',
                        element: <UserUpdatePage />
                    }
                ]
            },
            {
                path: ENTITY_ROUTES.ORDERS,
                children: [
                    {
                        index: true,
                        element: <OrderListPage />
                    },
                    {
                        path: 'create',
                        element: <OrderCreatePage />
                    }
                ]
            },

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