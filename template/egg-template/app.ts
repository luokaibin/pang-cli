require('module-alias/register');

export default class AppBootHook {
  app: any;
  constructor(app) {
    this.app = app;
  }
  // 这里的方法会在应用创建的时候执行一次
  // serverDidReady() {
  // }
}
