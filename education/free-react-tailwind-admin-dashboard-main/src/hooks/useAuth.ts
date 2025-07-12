import { useContext, useEffect, useState } from "react";
import { getProfile } from "../utils/api-axios";
import { ProfileType } from "../utils/type-request";
import { useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";

export function useAuth() {
    const localtion = useLocation();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<ProfileType | undefined>();
    const controller = new AbortController();
    const { updateAuthUser } = useContext(AuthContext);
    useEffect(() => {
        setLoading(true)
        getProfile()
            .then( res  => {
                setUser(res.data);
                updateAuthUser(res.data);
                //setTimeo  ut(() => setLoading(false),5000)
                setLoading(false);
            })
            .catch((err) => {
                console.log(err)
                setLoading(false);
                // setTimeout(() => setLoading(false), 5000)
            })
        return () => {
            controller.abort();
        }

    }, [])
    return { user, loading }
}
