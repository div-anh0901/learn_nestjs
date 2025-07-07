import { ApiBody, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateClassDto {
    @IsNotEmpty()
    @ApiProperty({ type: String, })
    className: string;

    @IsNotEmpty()
    @ApiProperty({ type: String ,description: 'dd/MM/yyy'  })
    date: string;

    @IsNotEmpty()
    @ApiProperty({ type: String,description: 'HH:mm' })
    startTime: string;

    @IsNotEmpty()
    @ApiProperty({ type: String,description: 'HH:mm' })
    endTime: string;

    @IsNotEmpty()
    @ApiProperty({ type: String })
    room: string;
}

export class UpdateClassDto {
    @IsNotEmpty()
    @ApiProperty({ type: String, })
    className: string;

    @IsNotEmpty()
    @ApiProperty({ type: String ,description: 'dd/MM/yyy'  })
    date: string;

    @IsNotEmpty()
    @ApiProperty({ type: String,description: 'HH:mm' })
    startTime: string;

    @IsNotEmpty()
    @ApiProperty({ type: String,description: 'HH:mm' })
    endTime: string;

    @IsNotEmpty()
    @ApiProperty({ type: String })
    room: string;

    @IsNotEmpty()
    @ApiProperty({ type: Boolean })
    isCanceled: boolean;
}

export class ResponseClassDataType {
    id: string;
    className: string;
    date: string;
    startTime: string;
    endTime: string;
    room: string;
    isCanceled: boolean;
    createdAt: Date;
    updatedDate: Date;
}