export class ResponseBoolean{
    message ?: string;
    success :boolean
}

export interface TypePanigation{
    page: number;
    limit: number
}

export interface TypeSearchBody extends TypePanigation {
    findText ?: string;
}

export class TypeMeta {
    "total": number;
    "page": number;
    "limit": number;
    "pages": number
}

import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationQueryDto implements TypeSearchBody {
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  limit: number;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  page: number;

  @IsOptional()
  findText?: string | undefined;
}