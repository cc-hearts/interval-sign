export interface taskInterface {
  id: string;
  title: string;
  description: string;
  isDelete: 0 | 1;
  createTime: Date;
}

export type callback = (...args: any[]) => any;
