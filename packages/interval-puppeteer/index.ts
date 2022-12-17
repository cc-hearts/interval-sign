import express from 'express';
import { logger } from "@cc-heart/utils";
import router from './router.js'
import { getYamlConfig } from "./utils/config.js";
const app = express();

app.use(router)
const { config } = getYamlConfig()
if(config === null) {
  throw new Error('新的端口有问题')
}
const { port } = config || {}

 app.listen(port, '0.0.0.0', () => {
  logger.log(`启动成功http://localhost:${port}`);
});