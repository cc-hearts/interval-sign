import * as path from 'path';
import * as fs from 'fs';
import { parse } from 'yaml';
import { createCipher, createDecipher } from 'crypto';
export const isDEV = () => process.env.NODE_ENV === 'dev';
export const isPROD = () => process.env.NODE_ENV === 'prod';
export const commonStr =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
export const getEnv = () => {
  return process.env.NODE_ENV;
};

function getYaml(yamlPath: string) {
  try {
    const file = fs.readFileSync(yamlPath, 'utf8');
    const config = parse(file);
    return config;
  } catch (e) {
    throw Error('get yaml error:' + e);
  }
}
export const getConfig = () => {
  // const env = getEnv();
  const yamlPath = path.join(__dirname, `../../app.yaml`);
  return getYaml(yamlPath);
};

export const getDefaultConfig = () => {
  const yamlPath = path.join(__dirname, `../../app.yaml`);
  return getYaml(yamlPath);
};

export const isObject = (value: unknown) =>
  Object.prototype.hasOwnProperty.call(value) === '[object Object]';

export function geneVerification(num = 4) {
  let ans = '';
  for (let i = 0; i < num; i++) {
    ans += commonStr.charAt(~~(Math.random() * commonStr.length));
  }
  return ans;
}

const REDIS_PREFIX_KEY = 4;

export function enRedisKey(key: string) {
  const len = commonStr.length;
  let prefix = '';
  for (let i = 0; i < REDIS_PREFIX_KEY; i++) {
    prefix += commonStr[~~(Math.random() * len)];
  }
  return `${prefix}-${key}`;
}

export function deRedisKey(key: string) {
  const reg = new RegExp(`\\w{${REDIS_PREFIX_KEY}}-(.*)`);
  const match = key.match(reg);
  if (match !== null) return match[1];
  return null;
}

/**
 *
 * @param data
 * @param key
 * @returns
 * @declare
 */
export function aesEncrypt(data, key = 'nest') {
  const cipher = createCipher('aes192', key);
  let ans = cipher.update(data, 'utf8', 'hex');
  ans += cipher.final('hex');
  return ans;
}

/**
 *
 * @param data
 * @param key
 * @returns
 * @declare
 */
export function aesDecrypt(data, key = 'nest') {
  const decipher = createDecipher('aes192', key);
  let decrypted = decipher.update(data, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
