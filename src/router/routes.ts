export const PUBLIC_ROUTES = {
    LOGIN: '/',
    REGISTER: 'register',
} as const;

export const PRIVATE_ROUTES = {
    ORDERS_LIST: 'order-list',
    ORDERS_CREATE: 'order-create',
    ORDERS_UPDATE: 'order-update',
} as const;

export const API_APP = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me'
} as const;export

const ERROR_ROUTES = {
    ERROR_403: '/forbidden-page',
    ERROR_404: '/notfound-page',
    ERROR_500: '/error-page',
} as const;