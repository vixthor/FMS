// resources/js/hooks/useAuth.ts
import { usePage } from '@inertiajs/react';

export default function useAuth() {
    const { auth } = usePage().props;

    const hasRole = (role: string) => auth.user?.roles.includes(role);
    const hasAnyRole = (roles: string[]) =>
        roles.some(role => auth.user?.roles.includes(role));
    const hasPermission = (permission: string) =>
        auth.user?.permissions.includes(permission);

    return {
        user: auth.user,
        hasRole,
        hasAnyRole,
        hasPermission,
        isAuthenticated: !!auth.user,
    };
}