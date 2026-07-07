import * as React from 'react';

export interface IRolesGuardProps {
    roles: string[],
    isRedirect?: boolean,
    children: React.ReactNode
}

export interface IRouterGuardProps {
    roles: string[],
    children: React.ReactNode
}