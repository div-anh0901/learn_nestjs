import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { DataStudents } from "../utils/type-request";
import { getStudents } from "../utils/api-axios";


export function useStudentHook(){
    const localtion = useLocation();
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState<DataStudents[]>([]);
    const controller = new AbortController();
    const [search, setSearch] = useState<string>();
    
    useEffect(() => {
        getStudents({limit: 10, page: 1, findText: search })
        .then(res =>{
            setStudents(res.data)
        }).catch(err=>{
            console.log(err)
        });
        return () => {
            controller.abort();
        }
    });

    return {students}
}