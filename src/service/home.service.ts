import { Provide } from '@midwayjs/core';
import { createHash } from 'crypto';

@Provide()
export class HomeService {
  async createHash(str: string) {
    // 创建一个 Hash 实例
    const hash = createHash('md5');

    // 更新 Hash 实例的内容
    hash.update(str);

    // 计算哈希值并以十六进制字符串形式输出
    const hashValue = hash.digest('hex');
    return hashValue;
  }
}
