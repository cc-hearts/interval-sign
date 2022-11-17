/**
 * @author heart
 * @description 流程
 * @Date 2022-11-03
 */

import Redis from "ioredis";
import { Connection } from "mysql2";
import { Interval, Config, Sql, Fetch, Shard } from "./lib/index.js";
import Logger from "./lib/log.js";
import { getHeapUsage } from "./lib/shard.js";
import type { timerCallback } from "./lib/types";
interface taskImpl {
  mysqlImpl: Connection;
  redisImpl: Redis;
}
// 初始化任务的func 获取一些配置参数 以及连接mysql redis
async function initTask(): Promise<taskImpl> {
  // 获取mysql数据
  const data = Config.getYamlConfig();
  Logger.info(data);
  const mysqlImpl = Config.connectMysqlServer(data.mysql);
  // 连接redis数据
  const redisImpl = Config.connectRedisServer(data.redis);

  return { mysqlImpl, redisImpl };
}

let interTask: timerCallback;
// 副作用的任务
function useTask(data: taskImpl) {
  const { mysqlImpl, redisImpl } = data;

  interTask = async () => {
    // 轮询需要做的操作:
    getHeapUsage()
    const arr = await Sql.searchAllTask(mysqlImpl);
    arr instanceof Array &&
      arr.forEach(async (acc) => {
        let { method, url, cookie, params, inter_time, id } = acc;
        const headers: { Cookie?: string } = {};
        if (cookie) {
          headers.Cookie = cookie;
        }
        try {
          params = JSON.parse(params);
          const idVal = await redisImpl.get(String(id));
          if (!idVal && Shard.compareHourAndMinutes(inter_time)) {
            Logger.info("===============task start==============");
            Fetch.request(url, method, params, headers).then(async () => {
              Sql.updateTime(mysqlImpl, id);
              // 默认一天时间
              await redisImpl.set(String(id), url, "EX", 60 * 60 * 24);
            });
          }
        } catch (e) {
          Logger.error("jsonParser error:", e);
          return;
        }
      });
  };
  Interval.addInterval(interTask);
}

// 结束的任务
// function endTask() {
//   Config.closeMysqlServer();
//   Interval.removeInterval(interTask);
// }

async function bootstrap() {
  const config = await initTask();
  useTask(config);
  // endTask();
}
export { bootstrap };
