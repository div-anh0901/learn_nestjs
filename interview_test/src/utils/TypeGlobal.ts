export class ResponseBoolean{
    message ?: string;
    success :boolean
}

export class TypePanigation{
    page: number;
    limit: number
}

export class TypeMeta {
    "total": number;
    "page": number;
    "limit": number;
    "pages": number
}

import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  limit: number;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  page: number;
}