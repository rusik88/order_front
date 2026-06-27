import type { ISelectOption } from '../ui/ElementsInterface.ts';

export interface IPerPageProps {
    options: ISelectOption[],
    classNames?: string,
    changeHandle: (val: number | string) => void
}