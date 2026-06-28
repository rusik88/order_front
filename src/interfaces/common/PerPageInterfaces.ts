export interface IPerPageProps {
    initPage: number | string,
    classNames?: string,
    changeHandle: (val: number | string) => void
}