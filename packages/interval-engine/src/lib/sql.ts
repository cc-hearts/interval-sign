import Logger from "./log.js";
import { getPrismaInstance } from "../lib/config.js";

async function searchAllTask() {
  const prisma = getPrismaInstance();
  const res = await prisma.interTask.findMany({
    where: {
      isDelete: 0,
    },
  });
  Logger.success(res);
  return res;
}

async function updateTime(id: number) {
  const prisma = getPrismaInstance();
  const res = await prisma.interTask.update({
    where: {
      id,
    },
    data: {
      updateTime: new Date(),
    },
  });
  Logger.success(res);
}

export { searchAllTask, updateTime };
