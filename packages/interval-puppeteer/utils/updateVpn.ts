import { logger } from '@cc-heart/utils';
import { PrismaClient } from '@prisma/client';
import puppeteer from 'puppeteer'
import { getYamlConfig } from './config.js';

const sleep = (sleep: number) =>
  new Promise((resolve) => setTimeout(resolve, sleep));

export default async function (prisma:PrismaClient, id: number | string) {
  const { login } = getYamlConfig()
  if (login === null) return
  const { url, userName, password } = login
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

  const {cookies} = await page.evaluate(() => {
    return {
      cookies: document.cookie,
    };
  });
  await prisma.interTask.update({
    where: {
      id: Number(id),
    },
    data: {
      cookie: cookies
    },
  });
  logger.success(cookies);
  return 'cookie'
}
