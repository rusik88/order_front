export interface IPerPageItem {
    value: number,
    label: string
}

export interface IPerPageProps {
    options: IPerPageItem[],
    changeHandle: (val: number) => void;
}