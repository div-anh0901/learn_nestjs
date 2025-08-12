import { toast } from 'react-toastify';
export const  ToastSuccess = (params:string)=> {
    return toast.success(params, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
}

export const  ToastError = (params:string)=> {
    return toast.error(params, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        });
}