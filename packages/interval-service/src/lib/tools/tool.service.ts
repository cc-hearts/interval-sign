import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { generatorFilePath } from '../../utils/oss';

@Injectable()
export class ToolService {
  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    console.log('tool Services 调用');
  }

  /**
   * getUUid
   */
  public get getUUid(): string {
    return randomUUID();
  }

  public get getOss() {
    return this.configService.get('oss');
  }

  public getFilePath(fileName: string) {
    if (!fileName) {
      throw new Error('文件名不能为空');
    }
    const oss = this.getOss;
    const { accessKey, secretKey, privateBucketDomain } = oss;
    return generatorFilePath(
      accessKey,
      secretKey,
      privateBucketDomain,
      fileName,
    );
  }
}
