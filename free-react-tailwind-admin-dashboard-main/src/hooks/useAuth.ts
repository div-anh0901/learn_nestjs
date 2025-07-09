import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAuthUser } from "../utils/api";

export function useAuth(){
    const [loading,setLoading] = useState(true);
    const { user, updateUser } = useContext(AuthContext);
    const controller = new AbortController();

    useEffect(()=>{
        getAuthUser().then(({data})=>{
            updateUser(data);
            setTimeout(()=>setLoading(false), 1000)
        }).catch((err)=>{
              setTimeout(()=>setLoading(false), 1000)
        })
        return ()=>{
            controller.abort()
        }
    },[])

    return {user, loading};
}


