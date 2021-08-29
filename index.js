#!/usr/bin/env node
const { Command } = require('commander');
const program = new Command();
program.version(require('./package.json').version);

program.option('-h, --help', '查看帮助命令')

program.command('init <template-type> <project-name>', '初始化一个项目', {executableFile: './bin/init'})


const distributeTheOrder = (params) => {
  if(params?.help) {
    program.outputHelp();
    process.exit(1)
  }
}
program.parse(process.argv);
distributeTheOrder(program.opts())
