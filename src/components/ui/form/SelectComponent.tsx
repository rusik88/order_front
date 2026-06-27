import Select, { type SingleValue } from 'react-select';
import type { ISelectOption, ISelectProps } from '../../../interfaces/ui/ElementsInterface';
import clsx from 'clsx';

const SelectComponent = ({ options, classNames, changeHandle }: ISelectProps) => {
    const selected_item: ISelectOption = options.find((item: ISelectOption) => item.selected)!;

    return (
        <Select
            options={options}
            defaultValue={selected_item}
            className={clsx(classNames)}
            unstyled
            onChange={(selectedOption: SingleValue<ISelectOption>) => {
                if (!selectedOption) {
                    return;
                }
                changeHandle(selectedOption.value);
            }}
            classNames={{
                control: ({ isFocused }) =>
                    `min-h-[42px] p-4 bg-white/5 border rounded-xl cursor-pointer transition cursor-pointer
                        ${ isFocused ? 'border-indigo-400/50' : 'border-white/10 hover:bg-white/10' }
                     `,
                valueContainer: () => 'pr-1',
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

export default SelectComponent;