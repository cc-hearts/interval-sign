import { readFileSync } from "node:fs";
import { Connection, createConnection } from "mysql2";
import { load } from "js-yaml";
import Logger from "./log";
import * as IoRedis from "ioredis";
import type { Config } from "./types";

function getYamlConfig(): Config | null {
  try {
    // pwd = /Users/heart/Desktop/i/interval/interval-engine
    return load(
      readFileSync(process.cwd() + "/app.yaml", { encoding: "utf8" })
    );
  } catch (e) {
    Logger.error(e);
    return null;
  }
}
type mysqlInstance = Connection | null;
interface connectMysqlServer {
  (mysqlConfig: Config["mysql"]): mysqlInstance;
  _mysqlImpl?: mysqlInstance;
}

const connectMysqlServer: connectMysqlServer = function (mysqlConfig) {
  if (connectMysqlServer._mysqlImpl) return connectMysqlServer._mysqlImpl;
  connectMysqlServer._mysqlImpl = createConnection(mysqlConfig);
  return connectMysqlServer._mysqlImpl;
};

function closeMysqlServer() {
  if (connectMysqlServer._mysqlImpl) {
    connectMysqlServer._mysqlImpl.end();
  }
  connectMysqlServer._mysqlImpl = null;
}
type redisInstance = IoRedis.Redis | null;
interface connectRedisServer {
  (redisConfig: Config["redis"]): redisInstance;
  _redisImpl?: redisInstance;
}
const connectRedisServer: connectRedisServer = function (redisConfig) {
  if (connectRedisServer._redisImpl) return connectRedisServer._redisImpl;
  connectRedisServer._redisImpl = new IoRedis.default(redisConfig);
  return connectRedisServer._redisImpl;
};

function closeRedisServer() {
  if (connectRedisServer._redisImpl) {
    // TODO: 关闭redis
  }
  connectRedisServer._redisImpl = null;
}

export {
  getYamlConfig,
  connectMysqlServer,
  closeMysqlServer,
  connectRedisServer,
  closeRedisServer,
};
