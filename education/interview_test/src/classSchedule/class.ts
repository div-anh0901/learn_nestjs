import { PaginationQueryDto } from "src/utils/TypeGlobal";
import { CreateClassDto, ResponseClassDataType, UpdateClassDto } from "./dto/class.dto";

export interface IClassSerivce{
    create(data: CreateClassDto): Promise<ResponseClassDataType>;
    update(id: string, data: UpdateClassDto): Promise<ResponseClassDataType>;
    getOne(id: string ): Promise<ResponseClassDataType>;
    getMulti(data ?: PaginationQueryDto);
    delete(id: string): Promise<any>;
}