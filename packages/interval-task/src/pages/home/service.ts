import { Get } from "../../utils/request";
import type { taskInterface } from "./type";
export function getList() {
  return Get<{ list: Array<taskInterface>; total: number }>(
    "api/interval/getIntervalById",
    {},
    {
      headers: {
        token: "8c4c0c3337386c2140b1404311ade0e1",
      },
    }
  );
}
