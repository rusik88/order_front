import type { IPaginateData } from '../common/PaginateInterfaces.ts';

export interface IOrderStatusGetAllQuery {
    page: number,
    per_page: number | string,
    name: string,
    sort_field: string,
    sort_direction: string
}

export interface IOrderStatusItem {
    id: number,
    name: string,
    slug: string,
    created_at: string,
    updated_at: string
}

export interface IOrderStatusResponseData {
    paginate: IPaginateData,
    order_statuses: IOrderStatusItem[]
}

export interface IOrderStatusData {
    order_status: IOrderStatusItem
}

