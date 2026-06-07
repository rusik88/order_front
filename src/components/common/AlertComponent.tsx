import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import { hideAlert } from '../../store/slices/AlertSlice';

const AlertComponent = () => {
    const dispatch = useAppDispatch();

    const { isVisible, text, type } = useAppSelector(
        state => state.alert
    );

    useEffect(() => {
        if (!isVisible) {
            return;
        }

        const timer = setTimeout(() => {
            dispatch(hideAlert());
        }, 3000);

        return () => clearTimeout(timer);
    }, [isVisible, dispatch]);
    
    const classesType = {
        error: 'text-red-600 border-red-600',
        warning: 'text-yellow-600 border-yellow-600',
        success: 'text-green-600 border-green-600',
    }[type] ?? 'text-green-600 border-green-600';

    return (
        <div className={clsx(
            'min-w-[340px] bg-blue-950 border rounded-s-lg fixed transition-all duration-300 z-50 top-8 right-0  py-3 px-5',
            isVisible
                ? 'translate-x-1'
                : 'translate-x-full',
            classesType
        )}>
            { text }
        </div>
    );
};

export default AlertComponent;