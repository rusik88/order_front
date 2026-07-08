import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Navigate } from 'react-router-dom';
import { PUBLIC_ROUTES } from '../../../router/routes';
import { removeToken } from '../../../store/slices/AuthSlice';
import { useLogoutMutation } from '../../../services/AuthApi';
import ButtonComponent from '../../ui/ButtonComponent';
import { showAlert } from '../../../store/slices/AlertSlice';
import type { IApiAppResponse, IApiErrorData } from '../../../interfaces/common/ApiAppInterfaces.ts';
import type { IApiUser } from '../../../interfaces/auth/AuthApiInterfaces';
import LoaderComponent from "../../common/LoaderComponent.tsx";

const HeaderComponent = () => {
    const dispatch = useAppDispatch();
    const [logout, { isLoading }] = useLogoutMutation();

    const user: IApiUser | null = useAppSelector(state => state.auth.user);

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
            const err_request = err as IApiErrorData;
            dispatch(showAlert({
                text: err_request.data.message,
                type: 'error',
            }));
        }
    };

    return (
        <>
            {isLoading && (
                <LoaderComponent />
            )}

            <header className="h-20 border-b border-white/10 bg-white/5 backdrop-blur-md">
                <div className="h-full px-8 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Orders</h1>
                    <div className="flex items-center gap-4">
                        {user !== null &&
                            (<p className="text-lg">{ user.name }</p>)
                        }
                        <ButtonComponent isDisabled={ isLoading } type={ 'inverse' } onClick={ logoutHandle }>Logout</ButtonComponent>
                    </div>

                </div>
            </header>
        </>

    );
};

export default HeaderComponent;