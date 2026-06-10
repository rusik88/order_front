export interface IApiLoginData {
    auth_token: string,
    user: IApiUser
}

export interface IApiUser {
    id: number,
    name: string,
    email: string,
    email_verified_at?: string | null,
    created_at?: string,
    updated_at?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IApiRegisterData extends IApiLoginData {}

