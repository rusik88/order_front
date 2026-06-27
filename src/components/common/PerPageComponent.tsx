import type { IPerPageProps } from '../../interfaces/common/PerPageInterfaces';
import SelectComponent from '../ui/form/SelectComponent';

const PerPageComponent = ({ options, changeHandle, classNames }: IPerPageProps) => {
    return (
        <>
            <SelectComponent options={ options } changeHandle={ changeHandle } classNames={ classNames } />
        </>
    );
};

export default PerPageComponent;