import { Get } from "../../utils/request";
import type { taskInterface } from "./type";
export function getList() {
  return Get<{ list: Array<taskInterface>; total: number }>(
    "api/interval/getIntervalById",
    {},
    {
      headers: {
        token: "8675c499997b3264aa5fd04006e5d2d4",
      },
    }
  );
}
