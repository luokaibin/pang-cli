import path from 'path';
import fs from 'fs/promises';
import process from 'process';
import dayjs from 'dayjs';
/** 版本号 start */
const generateVersion = async () => {
  const currDayjs = dayjs();
  const timestamp = currDayjs.unix();
  const date = currDayjs.format('YYYYMMDD');
  fs.writeFile(path.resolve(process.cwd(), 'public/vsrsion.json'), JSON.stringify({timestamp, date}), {encoding: 'utf-8'});
}


/** 版本号 end */

const flow = [generateVersion];

const run = async () => {
  let i = 0;
  while (i < flow.length) {
    const fn = flow[i];
    await fn();
    i++
  }
}

run();