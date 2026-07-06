import type { IPaginateData } from '../common/PaginateInterfaces.ts';
import type {IRoleItem} from "./RolesInterfaces.ts";

export interface IUserGetAllQuery {
    page: number,
    per_page: number | string,
    email: string,
    sort_field: string,
    sort_direction: string
}

export interface IUserItem {
    id: number,
    role_id: number,
    name: string,
    email: string,
    email_verified_at: null | string,
    created_at: string,
    updated_at: string
    role?: IRoleItem
}

export interface IUserResponseData {
    paginate: IPaginateData,
    users: IUserItem[]
}

export interface IUserData {
    user: IUserItem
}

