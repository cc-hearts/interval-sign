import { load} from 'js-yaml'
import { readFileSync } from 'fs'
import { logger } from '@cc-heart/utils';
interface config {
  login: {
    url: string
    userName: string
    password: string
  }
  config: {
    port: number
  }
}
let config: config
export function getYamlConfig(): config | null {
  try {
    config = load(
      readFileSync(process.cwd() + "/app.yaml", { encoding: "utf8" })
    );
    return config
  } catch (e) {
    logger.error(e);
    return null;
  }
}