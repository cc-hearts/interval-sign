/**
 * @author heart
 * @description 鉴权守卫
 * @Date 2022-10-03
 */

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { whitePathList } from 'src/constant/index';
import { decrypt, getUrlQuery, deRedisKey } from 'src/utils/';
import { RedisService } from 'src/lib/redis/redis.service';
// 鉴权守卫
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly redisService: RedisService,
    private readonly configService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // 鉴权路由白名单
    const url = this.getRequestRouter(request.url);
    if (this.validateRouterWhilePath(url)) return true;
    // 鉴权token
    const headers = request.rawHeaders;
    let token = '';
    for (let i = 0; i < headers.length; i++) {
      if (headers[i] === 'token' && i < headers.length - 1) {
        token = headers[i + 1];
      }
    }
    if (!token) {
      // token 以http 的形式 或者 rpc的形式 或者以url的形式
      token =
        context.switchToRpc().getData().headers.token ||
        request.body.token ||
        getUrlQuery(request.url, 'token');
    }
    if (!token) throw new HttpException('token 为空', HttpStatus.UNAUTHORIZED);
    // AES 解密得到token
    try {
      const data = deRedisKey(decrypt(token));
      // 去redis 鉴权 是否有权限登陆
      return this.redisService.get(data).then((res) => {
        if (res === null) {
          throw new HttpException('用户登陆已过期', HttpStatus.UNAUTHORIZED);
        }
        request.user = res;
        return !!res;
      });
    } catch (e) {
      throw new HttpException({ message: e }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //鉴权全路由白名单
  validateRouterWhilePath(path: string) {
    return whitePathList.includes(path);
  }
  getRequestRouter(url: string) {
    const prefix = this.configService.prefix;
    const reg = new RegExp(`\/${prefix}(?:\/v.){0,1}([^?]*)`, '');
    const res = url.match(reg);
    if (res) {
      return res[1];
    }
    throw new HttpException(
      { message: `路由错误----${url}` },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
