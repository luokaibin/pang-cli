export default {
  schedule: {
    // 每隔三秒执行一次
    cron: '0/3 * * * * *',
    // all 每台机器上的每个 worker 都会执行这个定时任务。 worker 每台机器上只有一个 worker 会执行这个定时任务，每次执行定时任务的 worker 的选择是随机的
    type: 'all',
    // 配置了该参数为 true 时，这个定时任务会在应用启动并 ready 后立刻执行一次这个定时任务
    immediate: true,
    //   // 配置该参数为 true 时，这个定时任务不会被启动。
    disable: true
    // 数组，仅在指定的环境下才启动该定时任务
    // env: []
  },
  // 入参为 ctx，匿名的 Context 实例，可以通过它调用 service 等
  async task(ctx) {
    ctx.logger.info('>>>>>>>>>>>', ctx);
  }
};
