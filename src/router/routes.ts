export const PUBLIC_ROUTES = {
    LOGIN: '/',
    REGISTER: 'register',
} as const;

export const ENTITY_ROUTES = {
    ROLES: 'roles',
    USERS: 'users',
    ORDERS: 'orders'
} as const;

export const API_APP = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',

    ROLES: '/roles',

} as const;

export const ERROR_ROUTES = {
    ERROR_403: '/forbidden-page',
    ERROR_404: '/notfound-page',
    ERROR_500: '/error-page',
} as const;