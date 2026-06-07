import { useAppDispatch } from '../../../store/hooks';
import { Navigate } from 'react-router-dom';
import { PUBLIC_ROUTES } from '../../../router/routes';
import { removeToken } from '../../../store/slices/AuthSlice';
import type { IApiAppResponse } from '../../../interfaces/auth/AuthApiInterfaces';
import { useLogoutMutation } from '../../../services/AuthApi';
import ButtonComponent from "../../ui/ButtonComponent.tsx";

const HeaderComponent = () => {
    const dispatch = useAppDispatch();
    const [logout, { isLoading }] = useLogoutMutation();

    const logoutHandle = async () => {
        try {
            const res: IApiAppResponse<[]> = await logout([]).unwrap();
            if(res.success !== undefined && res.success) {
                dispatch(removeToken());
                return <Navigate to={PUBLIC_ROUTES.LOGIN} replace />;
            } else {
                throw {
                    data: {
                        message: 'Logout failed. An unexpected server error occurred. Please try again later.'
                    }
                };
            }
        } catch(err) {
            //Todo Error Component
        }
    };

    return (
        <header className="h-20 border-b border-white/10 bg-white/5 backdrop-blur-md">
            <div className="h-full px-8 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Orders</h1>
                <ButtonComponent isDisabled={ isLoading } type={ 'inverse' } onClick={ logoutHandle }>Logout</ButtonComponent>
            </div>
        </header>
    );
};

export default HeaderComponent;