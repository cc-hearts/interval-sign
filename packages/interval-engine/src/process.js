/**
 * @author heart
 * @description 流程
 * @Date 2022-11-03
 */

import { Interval, Config, Sql, Fetch} from "./lib/index.js";
import Logger from "./lib/log.js";

// 每分钟的轮询
function createMinutesInterval(callback) {
  const { addInterval, removeInterval } = Interval;
  if (callback._timer) {
    removeInterval(callback);
  }
  addInterval(callback);
}

// 初始化任务的func 获取一些配置参数 以及连接mysql redis
async function initTask() {
  // 获取mysql数据
  const data = Config.getYamlConfig();
  Logger.log(data);
  const mysqlImpl = Config.connectMysqlServer(data.mysql);

  // 连接redis数据
  const redisImpl = Config.connectRedisServer(data.redis);

  return { mysqlImpl, redisImpl };
}

let interTask;
// 副作用的任务
function useTask(data) {
  const { mysqlImpl, redisImpl } = data;
  interTask = async () => {
    // 轮询需要做的操作:
    const arr = await Sql.searchAllTask(mysqlImpl);
    arr.forEach(async (acc) => {
      let { method, url, cookie, params, inter_time, id, update_time } = acc;
      const headers = {};
      if (cookie) {
        headers.Cookie = cookie;
      }
      try {
        params = JSON.parse(params);
        // const originDate = Shard.formatHoursAndMinutes(inter_time);
        const idVal = await redisImpl.get(id);
        Logger.log("redis id:", id, "redis data:", idVal);
        if (
          !idVal
          // Shard.compareHourAndMinutes(originDate) &&
          // !Shard.compareISODate(update_time)
        ) {
          // Interval.addTask(id, () => {
          Logger.log("===============task start==============");
          // Logger.log("inter_time", originDate);
          // Logger.log("update_time", update_time);
          Fetch.request(url, method, params, headers).then(async () => {
            Sql.updateTime(mysqlImpl, id);
            // 默认一天时间
            await redisImpl.set(id, url, "EX", 60 * 60 * 24);
            Logger.log("=====================end===============");
          });
          // });
        }
      } catch (e) {
        Logger.log("jsonParser error:", e);
        return;
      }
    });
  };
  Interval.addInterval(interTask);
}

// 结束的任务
function endTask() {
  Config.closeMysqlServer();
  // Interval.removeInterval(interTask);
}

async function bootstrap() {
  const config = await initTask();
  useTask(config);
  // endTask();
}
export { bootstrap };
