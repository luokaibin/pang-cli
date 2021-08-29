import { Application } from 'egg';
import * as goodid from 'goodid.js'
import { join } from 'path';

export default {
  // demo 定义一个只读常量
  get COOKIEFILE() {
    return 'cookie.json';
  },
  // demo 扩展app方法
  async getFilePath(file: string) {
    (this as Application).logger.info('传入路径为file>>>>>', file);
    const res = join(__dirname, file);
    return res;
  },
  /**
   * 生成8位短ID
   * @returns id string
   */
  createId() {
    return goodid(8);
  },
};
