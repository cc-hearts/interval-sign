import { HttpStatus } from '@nestjs/common';

interface otherParams {
  path?: string;
  timestamp?: string;
}
export class BaseResponseImpl<T> implements BaseResponse {
  public readonly path?: otherParams['path'];
  public readonly timestamp?: otherParams['timestamp'];
  constructor(
    public readonly message: string,
    public readonly data?: T,
    public readonly code = HttpStatus.OK,
    otherParams?: otherParams,
  ) {
    if (otherParams) {
      const { path, timestamp } = otherParams;
      this.path = path;
      this.timestamp = timestamp || new Date().toISOString();
    }
  }
}

export function throwErrorResponse<T>(
  message: string,
  data?: T,
  otherParams?: otherParams,
): BaseResponseImpl<T> {
  return new BaseResponseImpl(
    message,
    data,
    HttpStatus.INTERNAL_SERVER_ERROR,
    otherParams,
  );
}

export function successResponse<T>(
  message: string,
  data?: T,
  otherParams?: otherParams,
): BaseResponseImpl<T> {
  return new BaseResponseImpl(message, data, HttpStatus.OK, otherParams);
}
