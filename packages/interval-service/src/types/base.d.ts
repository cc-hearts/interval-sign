///<reference types="@nestjs.common" />
declare class BaseResponse {
  message?: string;
  code?: HttpStatus;
  data?: any;
  path?: string;
}
