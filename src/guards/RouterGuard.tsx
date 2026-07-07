import type { IRouterGuardProps } from '../interfaces/guards/GuardInterfaces';
import { useAppSelector } from '../store/hooks.ts';
import { checkAccess } from '../functions/quardFunctions';
import { Navigate } from 'react-router-dom';
import { ERROR_ROUTES } from '../router/routes.ts';

const RouterGuard = ({ roles, children }: IRouterGuardProps) => {
    const user_role: string = useAppSelector(state => state.auth.user_role)!;

    if(!checkAccess(roles, user_role)) return <Navigate to={ERROR_ROUTES.ERROR_403} replace />;

    return (
        <>
            {children}
        </>
    );
};

export default RouterGuard;