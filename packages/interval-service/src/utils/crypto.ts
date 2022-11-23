import { createCipheriv, createDecipheriv } from 'crypto';

// 初始化算法
const algorithm = 'aes-256-cbc';

// 初始化密钥
// const key = randomBytes(32)
const key = Buffer.from(
  '151db514745924e4a2e74ba6428f574095c62836257b975bf6f1875e46269135',
  'hex',
);
// 初始化iv向量
// const iv = randomBytes(16)
const iv = Buffer.from('549fab60f2cedba6fb5c21b33eec2464', 'hex');

export function encrypt(text: string) {
  const cipher = createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('hex');
}

export function decrypt(encryptedData: string) {
  const encryptedText = Buffer.from(encryptedData, 'hex');
  const i = Buffer.from(iv.toString('hex'), 'hex');
  const decipher = createDecipheriv(algorithm, Buffer.from(key), i);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
