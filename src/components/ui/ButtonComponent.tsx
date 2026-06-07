import clsx from 'clsx';
import * as React from 'react';
import  { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonComponentProps {
    children: ReactNode;
    classNames?: string;
    isDisabled?: boolean;
    link?: string;
    type?: 'default' | 'inverse';
    onClick?:  (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonComponent = (
    { children, classNames, isDisabled, link, type, onClick } : ButtonComponentProps) => {

    let baseClasses = clsx(
        'py-3 px-10 flex align-center justify-center rounded-xl bg-linear-to-r from-blue-500 to-blue-600 text-xl font-semibold text-white transition',
        'hover:from-blue-400 hover:to-blue-500 cursor-pointer',
        'disabled:cursor-not-allowed disabled:opacity-60 disabled:from-blue-500 disabled:to-blue-600',
        classNames
    );

    if(type === 'inverse') {
        baseClasses = clsx(
            'flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer',
            'disabled:cursor-not-allowed disabled:opacity-60',
            classNames
        );
    }

    if (link) {
        return (
            <Link to={link} className={baseClasses}>
                {children}
            </Link>
        );
    }

    return (
        <button
            className={baseClasses}
            disabled={isDisabled}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => onClick?.(event) }
        >
            {children}
        </button>
    );
};

export default ButtonComponent;