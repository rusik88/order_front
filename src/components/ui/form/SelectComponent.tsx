import Select, { type SingleValue } from 'react-select';
import type { ISelectOption, ISelectProps } from '../../../interfaces/ui/ElementsInterface';
import clsx from 'clsx';

const SelectComponent = ({ options, classNames, value, changeHandle }: ISelectProps) => {
    if(options === undefined) return <></>;
    //const selected_item: ISelectOption = options.find((item: ISelectOption) => item.selected)!;
    const selectedItem: ISelectOption = options.find(item => item.value == value)!;

    console.log("selectedItem", selectedItem, value);

    return (
        <Select
            options={options}
            className={clsx(classNames)}
            value = { selectedItem }
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
                option: ({ isFocused, isSelected, isDisabled }) =>
                    clsx(
                        'px-3 py-2 transition',
                        {
                            'cursor-pointer': !isDisabled,
                            'cursor-not-allowed opacity-50 text-slate-500': isDisabled,
                            'bg-indigo-500/20 text-indigo-300': isSelected && !isDisabled,
                            'bg-white/10 text-white': isFocused && !isDisabled,
                            'text-white': !isFocused && !isSelected && !isDisabled,
                        }
                    ),
            }}
        />
    );
};

export default SelectComponent;