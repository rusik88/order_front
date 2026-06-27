import clsx from 'clsx';
import type { InputComponentProps} from '../../../interfaces/ui/ElementsInterface';

export const InputComponent = ({ classNames, isDisabled, ...props }: InputComponentProps) => {
    return (
        <input
            disabled={isDisabled}
            {...props}
            className={clsx(
                'w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10  outline-none focus:border-blue-400/50 focus:bg-white/10 transition',
                classNames,
                isDisabled ? 'text-slate-400' : 'text-white'
            )}
        />
    );
};