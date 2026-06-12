import type { IPaginateData } from '../common/PaginateInterfaces.ts';

export interface IRoleGetAllQuery {
    page: number,
    per_page: number,
    name: string
}

export interface IRoleItem {
    id: number,
    name: string,
    slug: string,
    permissions: string,
    created_at: string,
    updated_at: string
}

export interface IRoleResponseData {
    paginate: IPaginateData,
    roles: IRoleItem[]
}

export interface IEntity {
    title: string,
    slug: string
}

export interface IRoleData {
    'role': IRoleItem
}

