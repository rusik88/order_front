import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';

interface InputComponentProps extends InputHTMLAttributes<HTMLInputElement> {
    classNames?: string;
}

export const InputComponent = ({ classNames, ...props }: InputComponentProps) => {
    return (
        <input
            {...props}
            className={clsx(
                'w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-blue-400/50 focus:bg-white/10 transition',
                classNames
            )}
        />
    );
};