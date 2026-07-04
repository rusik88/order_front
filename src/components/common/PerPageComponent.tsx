import type { IPerPageProps } from '../../interfaces/common/PerPageInterfaces';
import SelectComponent from '../ui/form/SelectComponent';
import type { ISelectOption } from '../../interfaces/ui/ElementsInterface.ts';

const options: ISelectOption[] = [
    { value: 5, label: '5', isDisabled: false },
    { value: 8, label: '8', isDisabled: false },
    { value: 10, label: '10', isDisabled: false },
    { value: 25, label: '25', isDisabled: false },
    { value: 50, label: '50', isDisabled: false },
    { value: 100, label: '100', isDisabled: false },
];

const defaultValue = 5;

const PerPageComponent = ({ changeHandle, classNames }: IPerPageProps) => {
    return (
        <>
            <SelectComponent options={ options } value={ defaultValue }  changeHandle={ changeHandle } classNames={ classNames } />
        </>
    );
};

export default PerPageComponent;