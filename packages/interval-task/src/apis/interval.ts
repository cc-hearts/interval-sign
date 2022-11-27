import { Get } from "../utils/request";
import type { taskInterface } from "@/types/types";
import { token } from "@/apis/config";
export function getList() {
  return Get<{ list: Array<taskInterface>; total: number }>(
    "api/interval/getIntervalById",
    {},
    {
      headers: {
        token: token,
      },
    }
  );
}
