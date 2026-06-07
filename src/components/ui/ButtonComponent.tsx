import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

const ButtonComponent = (
    { children, classNames, isDisabled, link }
    : {children: ReactNode, classNames?: string, isDisabled?: boolean, link?: string}) => {

    const baseClasses = clsx(
        'py-3 px-10 flex align-center justify-center rounded-xl bg-linear-to-r from-blue-500 to-blue-600 text-xl font-semibold text-white transition',
        'hover:from-blue-400 hover:to-blue-500 cursor-pointer',
        'disabled:cursor-not-allowed disabled:opacity-60 disabled:from-blue-500 disabled:to-blue-600',
        classNames
    );

    if (link) {
        return (
            <Link to={link} className={baseClasses}>
                {children}
            </Link>
        );
    }

    return (
        <button className={baseClasses} disabled={isDisabled}>
            {children}
        </button>
    );
};

export default ButtonComponent;