import { Controller } from 'egg';

export default class DemoController extends Controller {
  public async index() {
    const { ctx, app } = this;
    const body = await ctx.service.demo.getCookie();
    const filePath = await app.getFilePath(app.COOKIEFILE);
    ctx.body = {
      data: {
        id: app.createId(),
        cookieStr: body,
        filePath,
      }
    };
  }
}
