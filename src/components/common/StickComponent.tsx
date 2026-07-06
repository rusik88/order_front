import type { IStickProp } from '../../interfaces/common/StickInterfaces.ts';
import clsx from 'clsx';

const StickComponent = ({ text, type }: IStickProp) => {

    const classes = {
        info:       'bg-blue-500/20 text-blue-300 border border-blue-400/30',
        success:    'bg-green-500/20 text-green-300 border border-green-400/30',
        warning:    'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30',
        error:      'bg-red-500/20 text-red-300 border border-red-400/30',
    };

    const currentClass = classes[type] ?? 'bg-slate-500/20 text-slate-300 border border-slate-400/30';

    return (
        <span className={ clsx(
            'px-3 py-1 text-xs rounded-full',
            currentClass
        ) }>
            { text }
        </span>
    );
};

export default StickComponent;