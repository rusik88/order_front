export interface IApiAppResponse<T> {
    success: boolean,
    message: string,
    data: T
}

export interface IApiErrorData {
    data: IApiAppResponse<[]>,
    status: number
}