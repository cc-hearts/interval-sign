const puppeteer =  require("puppeteer").default
const { getYamlConfig } = require('./config')
const sleep = (sleep: number) =>
  new Promise((resolve) => setTimeout(resolve, sleep));

module.exports = async function(prisma, id ) {
  const { url,userName,password } = getYamlConfig()
  const browser = await puppeteer.launch({
    // 路径
    executablePath:
      "/Users/heart/Desktop/pupuper/Chromium.app/Contents/MacOS/Chromium",
    timeout: 1000 * 30,
  });
  const page = await browser.newPage(); // 创建一个新的页面

  await page.goto(url);

  await page.type("#email", userName);

  await page.type("#password", password);

  await page.click("#login_submit");

  await sleep(10 * 1000);

  const cookie = await page.evaluate(() => {
    return {
      // @ts-ignore
      cookies: document.cookie,
    };
  });
  await prisma.interTask.update({
    where: {
      id: Number(id),
    },
    data: {
      cookie
    },
  });
  logger.success(cookie);
  return 'cookie'
}
