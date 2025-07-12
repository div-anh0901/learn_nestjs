
export type CreateUser = {
    email: string;
    username: string;
    password: string;
}


export type LoginType = {
    email: string;
    password: string;
}


export type ProfileType={
    _id : string;
    username: string;
    email : string;
    age ?: string;
    avatar ?: string;
    address ?: string;
    role ?: string;
    codeId ?: string; // so cccd
    createBy ?: string;
    password ?:string;
    isActived?: boolean;
    status?: boolean;
    phone: boolean;
}