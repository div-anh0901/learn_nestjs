import { PaginationQueryDto, ResponseBoolean, TypePanigation } from "src/utils/TypeGlobal";
import { CreateStudentDto } from "../dto/create-student.dto";
import { UpdateStudentDto } from "../dto/update-student.dto";
import { AddStudentToCourse, AddStudentToCourseMulti } from "../dto/student-and-course.dto";


export interface Student {
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
}

export interface IUserStudentService {
    createStudent(student: CreateStudentDto): Promise<CreateStudentDto>;
    changePassword(idstudent: string , password: string): Promise<boolean>;
    updateUser(idstudent: string ,data : UpdateStudentDto): Promise<ResponseBoolean>;
    getAllStudent(data ?: PaginationQueryDto);
    getOneStudent(idstudent: string);
    deleteStudent(idstudent: string): Promise<Boolean>;
    addStudentInCourse(param: AddStudentToCourse);
    addStudentInCourseMutil(param: AddStudentToCourseMulti);
    getStudentByIDMutil(param: string[]);
    exportExcel();
}