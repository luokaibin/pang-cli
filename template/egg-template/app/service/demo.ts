import {Service} from 'egg';

/**
 * Test Service
 */
export default class Demo extends Service {
  public async getCookie() {
    const {app, ctx} = this;
    const {
      headers: {'set-cookie': resCookie}
    } = await ctx.httpclient.request('https://bilibili.iiilab.com/', {
      method: 'GET',
      // headers: {
      //   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      // },
      // data: {

      // },
      // 设置响应数据格式，默认不对响应数据做任何处理，直接返回原始的 buffer 格式数据。 支持 text 和 json 两种格式。
      dataType: 'text'
    });
    ctx.logger.info(resCookie);
    const cookie = ctx.helper.parseCookie(resCookie);
    ctx.logger.info(cookie);
    const cookieStr = ctx.helper.formatterCookie(cookie);
    ctx.logger.info(cookieStr);
    return cookieStr;
  }
}
