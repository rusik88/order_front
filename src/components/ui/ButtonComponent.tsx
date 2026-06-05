import clsx from 'clsx';
import type {ReactNode} from 'react';

const ButtonComponent = (
    { children, classNames }
    : {children: ReactNode, classNames?: string}) => {
    return (
      <button className={clsx(
          classNames,
          'cursor-pointer h-13 w-full rounded-xl bg-linear-to-r from-blue-500 to-blue-600 text-xl font-semibold text-white transition hover:from-blue-400 hover:to-blue-500'
      )}>{ children }</button>
    );
};

export default ButtonComponent;