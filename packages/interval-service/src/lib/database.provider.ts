/**
 * @author heart
 * @description mysql 数据库配置
 * @Date 2022-10-04
 */
import { DataSource } from 'typeorm';
import { getConfig, isPROD } from 'src/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
export const mysqlConfig = () => {
  const { mysql } = getConfig();
  return Object.assign({}, mysql, {
    entities: [__dirname + '../../*/entity{.ts,.js}'], // 配置实体类的位置
    synchronize: !isPROD(), //  生产环境关闭 如果为 true，那么在连接数据库时，typeorm 会自动根据 entity 目录来修改数据表 可能造成的结果是直接删除数据
    autoLoadEntities: true,
  });
};
export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const databaseConfig = mysqlConfig();
      const dataSource = new DataSource(databaseConfig);
      return dataSource.initialize();
    },
  },
];
const getMysqlConfig = mysqlConfig();
export default [TypeOrmModule.forRoot(getMysqlConfig)];
