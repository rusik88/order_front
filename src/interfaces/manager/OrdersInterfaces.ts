import type { IPaginateData } from '../common/PaginateInterfaces.ts';
import type {IOrderStatusItem} from "./OrderStatusesInterfaces.ts";

export interface IOrderGetAllQuery {
    page: number,
    per_page: number | string,
    name: string,
    sort_field: string,
    sort_direction: string
}

export interface IOrderItem {
    id: number,
    name: string,
    total: number,
    order_status_id: number,
    comment: string,
    created_at: string,
    updated_at: string,
    order_status: IOrderStatusItem
}

export interface IOrderResponseData {
    paginate: IPaginateData,
    orders: IOrderItem[]
}

export interface IOrderData {
    order: IOrderItem
}

