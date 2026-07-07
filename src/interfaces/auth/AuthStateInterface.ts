import type { IApiUser } from './AuthApiInterfaces.ts';

export interface AuthStateInterface {
    auth_token: string | null,
    user: IApiUser | null,
    user_role: string | null
}

export interface AuthPayloadLoginInterface {
    auth_token: string,
    user: IApiUser
}