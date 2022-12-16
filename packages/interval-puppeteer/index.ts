const express = require('express');
const router  = require('./router')
const {logger} = require('@cc-heart/utils')

const app = express();

app.use(router)

 app.listen('3001', '0.0.0.0', () => {
  logger.log(`启动成功http://localhost:${3001}`);
});