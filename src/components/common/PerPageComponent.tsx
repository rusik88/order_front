import Select, { type SingleValue } from 'react-select';
import type { IPerPageItem, IPerPageProps} from '../../interfaces/common/PerPageInterfaces';

const PerPageComponent = ({ options, changeHandle }: IPerPageProps) => {
    return (
        <Select
            options={options}
            defaultValue={options[0]}
            className="w-[90px]"
            unstyled
            onChange={(selectedOption: SingleValue<IPerPageItem>) => {
                if (!selectedOption) {
                    return;
                }
                console.log(1111);
                changeHandle(selectedOption.value);
            }}
            classNames={{
                control: ({ isFocused }) =>
                    `min-h-[42px] bg-white/5 border rounded-xl cursor-pointer transition
                        ${ isFocused ? 'border-indigo-400/50' : 'border-white/10 hover:bg-white/10' }
                     `,
                valueContainer: () => 'px-3',
                singleValue: () => 'text-white',
                input: () => 'text-white',
                placeholder: () => 'text-slate-400',
                indicatorSeparator: () => 'hidden',
                dropdownIndicator: () =>
                    'text-slate-400 hover:text-white transition',
                menu: () => 'mt-2 overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-xl',
                menuList: () => 'p-0',
                option: ({ isFocused, isSelected }) =>
                    `px-3 py-2 cursor-pointer transition
                        ${ isSelected ? 'bg-indigo-500/20 text-indigo-300' : isFocused ? 'bg-white/10 text-white' : 'text-white' } `,
            }}
        />
    );
};

export default PerPageComponent;