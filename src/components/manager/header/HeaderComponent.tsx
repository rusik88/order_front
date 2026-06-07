import { useAppDispatch } from '../../../store/hooks';
import { Navigate } from 'react-router-dom';
import { PUBLIC_ROUTES } from '../../../router/routes';
import { removeToken } from '../../../store/slices/AuthSlice';
import type { IApiAppResponse } from '../../../interfaces/auth/AuthApiInterfaces';
import { useLogoutMutation } from '../../../services/AuthApi';

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
                <button
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer"
                    disabled={ isLoading }
                    onClick={() => logoutHandle()}
                >Logout</button>
            </div>
        </header>
    );
};

export default HeaderComponent;