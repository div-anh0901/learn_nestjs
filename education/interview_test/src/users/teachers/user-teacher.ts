import { PaginationQueryDto } from "src/utils/TypeGlobal";
import { CreateTeachertDto } from "../dto/user-teacher.dto";
import { IUserStudentService } from "../students/user-student";

export interface Teacher {
    id: string;
    username: string;
    email: string;
    age: string;
    avatar: string;
    address: string;
    role?: string;
    codeId: string; // so cccd
    createBy: string;
    password ?:string;
    phone ?: string; 
    gender ?: string; 
    birthday ?: string; 
    isDeteled: boolean;
}
type Minimal = Pick<IUserStudentService, 'create' | 'update' | 'getOne' | 'getAll' |'delete'>;

export interface IUserTeacherService extends Minimal {
    
}