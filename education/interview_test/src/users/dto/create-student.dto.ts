
export class CreateStudentDto {
    username: string;
    email: string;
    age: string;
    avatar: string;
    address: string;
    role: string;
    codeId: string; // so cccd
    createBy: string;
    password ?:string;
    phone ?: string; 
}