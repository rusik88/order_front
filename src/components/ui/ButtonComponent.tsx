import clsx from 'clsx';
import type { ReactNode } from 'react';

const ButtonComponent = (
    { children, classNames, isDisabled }
    : {children: ReactNode, classNames?: string, isDisabled?: boolean}) => {
    return (
      <button className={clsx(
            classNames,
            'h-13 w-full rounded-xl bg-linear-to-r from-blue-500 to-blue-600 text-xl font-semibold text-white transition',
            'hover:from-blue-400 hover:to-blue-500 cursor-pointer',
            'disabled:cursor-not-allowed disabled:opacity-60 disabled:from-blue-500 disabled:to-blue-600'
      )} disabled={isDisabled}>{ children }</button>
    );
};

export default ButtonComponent;