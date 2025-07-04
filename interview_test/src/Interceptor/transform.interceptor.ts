// common/interceptors/transform.interceptor.ts
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    meta?: any;
  }
  
  @Injectable()
  export class TransformInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
        return next.handle().pipe(
            map((res: any) => {
              if (res?.data !== undefined) {
                return {
                  success: true,
                  message: res.message || 'OK',
                  data: res.data,
                  ...(res.meta && { meta: res.meta }),
                };
              }
              return {
                success: true,
                message: 'OK',
                data: res,
              };
        }),
      );
    }
  }