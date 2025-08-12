
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
    phone: string;
}
export type UpdateProfile = {
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
    phone?: string;
}

export type DataStudents ={
    _id : string;
    username: string;
    email : string;
    age : string;
    avatar : string;
    address ?: string;
    role ?: string;
    codeId ?: string; // so cccd
    createBy ?: string;
    password ?:string;
    isActived?: boolean;
    status?: boolean;
    phone: string;
}

export type DataTeacher ={
    _id : string;
    username: string;
    email : string;
    age : string;
    avatar : string;
    address ?: string;
    role ?: string;
    codeId ?: string; // so cccd
    createBy ?: string;
    password ?:string;
    isActived?: boolean;
    status?: boolean;
    phone: string;
}


export type ApiResponse<Data> ={
    data: Data,
    meta: {
        limit: number,
        page: number,
        total: number
    }
}
export interface Pagination {
    page: number;
    limit: number
}


export interface TypeSearchBody extends Pagination {
    findText ?: string;
}

export interface IID  {
    id: string
}


export interface CreateStudentDto {
    username: string;
    email: string;
    age?: string;
    address?: string;
    codeId?: string; // so cccd
    phone ?: string; 
    gender : string;
    birthday: string
}

export interface TypeDetailStudent extends IID, CreateStudentDto{
    avatar: string;
}


export interface FecthDataCourse {
    id: string;
    name: string;
    title: string;
    time: number;
    description: string;
    createdBy: string;
    teacher: string;
    subject: string;
}

export interface CreateCourse {
    name: string;
    title: string;
    time: number;
    description: string;
    teacher: string;
    subject: string;
}



