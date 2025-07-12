import { createContext } from "react";
import { ProfileType } from "../utils/type-request";
type AuthContextType = {
    user?: ProfileType;
    updateAuthUser:(data: ProfileType)=> void
}
export const AuthContext = createContext<AuthContextType>({
    updateAuthUser: () => {},
});
