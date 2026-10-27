// components/authroutes/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";

type ProtectedRouteProps = {
    children: React.ReactNode,
    adminOnly?: boolean;
}

export function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
    const { isAuthenticated, user, loading } = useAuth();

    if(loading) return null;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const isAdmin = user?.roles.includes("admin") ?? false;

    if(adminOnly && !isAdmin){
        return <Navigate to="/" replace />; // cliente vai pra home se nao for admin.
    }

    return <>{children}</>;
}
