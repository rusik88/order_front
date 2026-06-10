export interface IPaginateData {
    current_page: number,
    from: number,
    last_page: number,
    per_page: number,
    to: number,
    total: number
}

export interface IPaginateProps {
    paginate: IPaginateData,
    paginateHandle: (page: number) => void
}