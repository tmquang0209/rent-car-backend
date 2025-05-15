import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse: any =
      exception instanceof HttpException
        ? exception?.getResponse()
        : {
            message: 'Internal Server Error!',
          };
    const errorResponse = {
      status: 'error',
      message: Array.isArray(exceptionResponse.message)
        ? exceptionResponse.message
        : [exceptionResponse.message],
    };
    console.error(`[${request.method}] ${request.url}`, exception);
    response.status(httpStatus).json(errorResponse);
  }
}
