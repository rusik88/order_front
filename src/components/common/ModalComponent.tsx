import {type ReactNode} from 'react';

interface IModalProps {
    children?: ReactNode,
    isShow: boolean,
}

const ModalComponent = ({ children, isShow }: IModalProps) => {

    return (
        <>
            {isShow && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-[420px]">
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalComponent;