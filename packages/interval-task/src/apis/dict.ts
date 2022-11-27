import { Post, type params } from "@/utils/request";
import { token } from "@/apis/config";
export function addDict<T extends params>(data: T) {
  return Post("api/dict/addDict", data, {
    headers: {
      token: token,
    },
  });
}

export function addDictMap<T extends params>(data: T) {
  return Post("api/dict/addDictMap", data, {
    headers: {
      token: token,
    },
  });
}
