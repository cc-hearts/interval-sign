import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseResponseImpl } from 'src/lib/BaseResponse';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // 获取 http的上下文
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const excImpl = exception.getResponse();
    let msg = exception.message.toString();
    if (typeof excImpl === 'object') {
      msg = Reflect.get(excImpl, 'message');
    }
    const message = msg || null;
    const msgLog = new BaseResponseImpl(
      message,
      void 0,
      status || HttpStatus.INTERNAL_SERVER_ERROR,
      { path: request.url },
    );
    Logger.error(
      'HttpExceptionFilter:',
      JSON.stringify(msgLog),
      'HttpException',
    );
    response.status(status).json(msgLog);
  }
}
