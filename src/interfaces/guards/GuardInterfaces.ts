import * as React from 'react';

export interface IRolesGuardProps {
    roles: string[],
    children: React.ReactNode
}

export interface IRouterGuardProps {
    roles: string[],
    children: React.ReactNode
}