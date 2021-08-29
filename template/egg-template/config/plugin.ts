import { EggPlugin } from 'egg';
import { join } from 'path';

const plugin: EggPlugin = {
  cookie: {
    enable: true,
    path: join(__dirname, '../lib/egg-cookie')
  }
};

export default plugin;
