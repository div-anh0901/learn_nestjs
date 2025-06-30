import { CreateStudentDto } from "../dto/create-student.dto";


export interface IUserStudentService {
    createStudent(student: CreateStudentDto): Promise<CreateStudentDto>
}