import { FC } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";

export const  AuthticationRoute : FC<React.PropsWithChildren>=({children})=> {
    const location = useLocation();
    const { loading, user } = useAuth();
    if (loading) {
        return <div>loading</div>;
      }
    if (user) return <>{children}</>;
    return <Navigate to="/signin" state={{ from: location }} replace />;
}