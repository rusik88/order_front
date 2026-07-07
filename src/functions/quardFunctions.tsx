export const checkAccess = (roles: string[], userRole: string): boolean => {
    return roles.includes(userRole);
};