import { Connection} from "mysql2";
import Logger from "./log";
import { getCurrentDateFormat } from "./shard";
import type { InterEntity } from "./types";
async function searchAllTask(sqlImpl: Connection): Promise<Array<InterEntity>> {
  return new Promise((resolve, reject) => {
    sqlImpl.query(
      `select * from inter_task where is_delete = 0`,
      function (err, result) {
        if (err) {
          Logger.log(err);
          reject(err);
          return;
        }
        resolve(result as Array<InterEntity>);
      }
    );
  });
}

function updateTime(sqlImpl: Connection, id: number) {
  const modSql = "UPDATE inter_task SET update_time = ? WHERE id = ?";
  const params = [getCurrentDateFormat(), id];
  sqlImpl.query(modSql, params, (err, result) => {
    if (err) {
      Logger.info(err);
      return;
    }
    Logger.info("UPDATE affectedRows", result);
  });
}

export { searchAllTask, updateTime };
