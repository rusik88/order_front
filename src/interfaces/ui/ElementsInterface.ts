import {type InputHTMLAttributes, type ReactNode} from 'react';
import * as React from 'react';

export interface IButtonProps {
    children: ReactNode;
    classNames?: string;
    isDisabled?: boolean;
    link?: string;
    type?: 'default' | 'inverse' | 'info' | 'error' | 'inverse_info',
    onClick?:  (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface InputComponentProps extends InputHTMLAttributes<HTMLInputElement> {
    classNames?: string,
    isDisabled?: boolean
}

export interface ISelectProps {
    options: ISelectOption[];
    classNames?: string;
    value: string | number,
    changeHandle: (value: string | number) => void;
}

export interface ISelectOption {
    value: number | string,
    label: string,
    isDisabled: boolean
}