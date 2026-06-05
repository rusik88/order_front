import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from '../layouts/AuthLayout';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage';

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
    }
]);