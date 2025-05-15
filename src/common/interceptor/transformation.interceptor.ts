import { RESPONSE_MSG_KEY } from '@common/enums';
import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformationInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const responseMessage =
      this.reflector.get<string>(RESPONSE_MSG_KEY, context.getHandler()) ?? '';
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data) => {
        const status = 'success';
        if (
          [201, 200].includes(
            context.switchToHttp().getResponse().statusCode as number,
          )
        ) {
          response.status(HttpStatus.OK);
        }
        return {
          status,
          message: responseMessage,
          data: data,
        };
      }),
    );
  }
}
