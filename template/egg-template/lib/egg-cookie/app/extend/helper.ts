export default {
  /**
   * 解析服务器返回的cookie 将 string 解析成 object
   * @param params 要解析的cookie 服务器返回的cookie一般在 response header set-cookie 直接将这个字段传入即可
   * @returns JSON 对象
   */
  parseCookie(params: string[]) {
    const cookie: {[key: string]: any} = {};
    params.forEach((item) => {
      const itemStr = item.replace(/\s/g, '');
      const [cookieStr] = itemStr.split(';');
      const [key, value] = cookieStr.split('=');
      cookie[key] = value;
    });
    return cookie;
  },
  /**
   * 将JSON 对象格式化成字符串 格式化之后可以直接赋值给 请求的header Cookie
   * @param cookie JSON 对象
   * @returns 格式化后的字符串
   */
  formatterCookie(cookie: {[key: string]: any}): string|undefined {
    if (!cookie) return undefined;
    return Object.keys(cookie)
        .map((k) => `${k}=${encodeURI(cookie[k])}`)
        .join('; ');
  }
}