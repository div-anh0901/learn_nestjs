import { PaginationQueryDto, ResponseBoolean, TypePanigation } from "src/utils/TypeGlobal";
import { CreateStudentDto } from "../dto/create-student.dto";
import { UpdateStudentDto } from "../dto/update-student.dto";


export interface IUserStudentService {
    createStudent(student: CreateStudentDto): Promise<CreateStudentDto>;
    changePassword(idstudent: string , password: string): Promise<boolean>;
    updateUser(idstudent: string ,data : UpdateStudentDto): Promise<ResponseBoolean>;
    getAllStudent(data ?: PaginationQueryDto);
    getOneStudent(idstudent: string);
    deleteStudent(idstudent: string): Promise<Boolean>;

}