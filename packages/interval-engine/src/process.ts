/**
 * @author heart
 * @description 流程
 * @Date 2022-11-03
 */

import Redis from "ioredis";
import { Interval, Config, Sql, Fetch, Shard } from "./lib/index.js";
import Logger from "./lib/log.js";
import type { timerCallback } from "./lib/types";
interface taskImpl {
  redisImpl: Redis;
}
// 初始化任务的func 获取一些配置参数 以及连接mysql redis
async function initTask(): Promise<taskImpl> {
  // 获取mysql数据
  const data = Config.getYamlConfig();
  Logger.info(data);
  // 连接redis数据
  const redisImpl = Config.connectRedisServer(data.redis);

  return { redisImpl };
}

let interTask: timerCallback;
// 副作用的任务
function useTask(data: taskImpl) {
  const { redisImpl } = data;
  interTask = async () => {
    // 轮询需要做的操作:
    const arr = await Sql.searchAllTask();
    arr instanceof Array &&
      arr.forEach(async (acc) => {
        let { method, url, cookie, params, interTime, id } = acc;
        const headers: { Cookie?: string } = {};
        if (cookie) {
          headers.Cookie = cookie;
        }
        try {
          params = JSON.parse(params);
          const idVal = await redisImpl.get(String(id));
          let time = interTime.toISOString().split(/[T.]/)[1].split(':').splice(0 , -1).join(':');
          if (true || !idVal && Shard.compareHourAndMinutes(time)) {
            Logger.info("===============task start==============");
            Fetch.request(url, method, params, headers).then(async () => {
              Sql.updateTime(id);
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
