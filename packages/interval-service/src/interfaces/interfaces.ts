import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseResponseImpl } from 'src/lib/BaseResponse';

// 请求返回的数据体结构
interface Response<T> {
  data?: T;
}
@Injectable()
export class ResponseInterceptor<T extends BaseResponse>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    console.log('进入全局的响应拦截器 还没有进入管道之前的拦截器');
    // 将数据再次封装一层
    return next.handle().pipe(
      map((val) => {
        if (val === void 0) val = Object.create(null);
        const { data = void 0, code = 500, message = '' } = val;
        return new BaseResponseImpl(message?.toString?.(), data, code, {
          path: request.url,
        });
        // return {
        //   statusCode: code,
        //   timestamp: new Date().toISOString(),
        //   path: request.url,
        //   message: message.toString() || '请求成功',
        //   data: data,
        // }
      }),
    );
  }
}
