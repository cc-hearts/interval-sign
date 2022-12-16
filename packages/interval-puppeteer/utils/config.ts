const { logger } =  require("@cc-heart/utils")
const { load } = require('js-yaml')
const { readFileSync} = require('fs')
function getYamlConfig(): null {
  try {
    // pwd = /Users/heart/Desktop/i/interval/interval-engine
    return load(
      readFileSync(process.cwd() + "/app.yaml", { encoding: "utf8" })
    );
  } catch (e) {
    logger.error(e);
    return null;
  }
}
export {}
exports.getYamlConfig = getYamlConfig