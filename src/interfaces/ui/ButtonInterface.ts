import  { type ReactNode } from 'react';
import * as React from 'react';

export interface IButtonProps {
    children: ReactNode;
    classNames?: string;
    isDisabled?: boolean;
    link?: string;
    type?: 'default' | 'inverse' | 'info' | 'error',
    onClick?:  (event: React.MouseEvent<HTMLButtonElement>) => void;
}