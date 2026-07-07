import { useAppSelector } from '../store/hooks.ts';
import type { IRolesGuardProps } from '../interfaces/guards/GuardInterfaces';
import { Navigate } from 'react-router-dom';
import { ERROR_ROUTES } from '../router/routes';

const RoleGuard = ({ roles, isRedirect, children }: IRolesGuardProps) => {
    const user_permissions: string[] = useAppSelector(state => state.auth.user_permissions);
    let hasAccess = true;

    if(isRedirect === undefined) isRedirect = false;

    if(user_permissions.length > 0) {
        if(roles.length === 0 ) return <Navigate to={ERROR_ROUTES.ERROR_403} replace />;

        roles.map((item: string) => {
            if(hasAccess && !user_permissions.includes(item)) hasAccess = false;
        });

        if(!hasAccess && isRedirect) return <Navigate to={ERROR_ROUTES.ERROR_403} replace />;
        if(!hasAccess) return (<></>);
    }

    return (
        <>
            { children }
        </>
    );
};

export default RoleGuard;