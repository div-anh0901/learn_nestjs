import { createContext } from "react";
import { User } from "../utils/type";

type AuthContextType ={
    user?: User;
    updateUser: (data : User) => void;
}

export const AuthContext = createContext<AuthContextType>({
    updateUser:()=>{}
});
