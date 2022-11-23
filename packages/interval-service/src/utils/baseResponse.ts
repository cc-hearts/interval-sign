/**
 * @author heart
 * @description 基本返回类
 * @Date 2022-05-16
 */
import { HttpStatus } from '@nestjs/common';
// 基本数据类型返回类
export class BaseResponse<T = null> {
  private readonly code: HttpStatus;
  private readonly message: string;
  private readonly data: T;
  constructor(code: HttpStatus, message?: string, data?: T) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}
