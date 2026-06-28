import type { IPerPageProps } from '../../interfaces/common/PerPageInterfaces';
import SelectComponent from '../ui/form/SelectComponent';
import type { ISelectOption } from '../../interfaces/ui/ElementsInterface.ts';

const options: ISelectOption[] = [
    { value: 5, label: '5', selected: true },
    { value: 8, label: '8', selected: false },
    { value: 10, label: '10', selected: false },
    { value: 25, label: '25', selected: false },
    { value: 50, label: '50', selected: false },
    { value: 100, label: '100', selected: false },
];

const PerPageComponent = ({ changeHandle, classNames }: IPerPageProps) => {
    return (
        <>
            <SelectComponent options={ options }  changeHandle={ changeHandle } classNames={ classNames } />
        </>
    );
};

export default PerPageComponent;