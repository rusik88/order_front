import type { IRolesGuardProps } from '../interfaces/guards/GuardInterfaces';
import { useAppSelector } from '../store/hooks.ts';
import { checkAccess } from '../functions/quardFunctions.tsx';

const UserGuard = ({ roles, children }: IRolesGuardProps) => {
    const user_role: string = useAppSelector(state => state.auth.user_role)!;

    return (
        <>
            { checkAccess(roles, user_role) &&
                children
            }
        </>
    );
};

export default UserGuard;