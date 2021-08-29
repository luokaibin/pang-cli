import {createHash} from 'crypto';

export default {
  /**
   * MD5 加密
   * @param str 要加密的字符串
   * @returns 加密后的字符串
   */
  md5(str: string): string {
    const md5 = createHash('md5');
    md5.update(str);
    return md5.digest('hex');
  },
  /**
   * 生成随机字符串
   * @param min 最短长度，默认5
   * @param max 最大长度，默认10
   * @returns 生成的随机字符串
   */
  randomStr(min = 5, max = 10) {
    let str = '',
      range = min;
    const arr = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    range = Math.round(Math.random() * (max - min)) + min; // 任意长度
    for (let i = 0; i < range; i++) {
      const pos = Math.round(Math.random() * (arr.length - 1));
      str += arr[pos];
    }
    return str;
  }
};
