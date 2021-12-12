#!/usr/bin/env node
const { Command } = require('commander');
const generator = require('./generator');
const program = new Command();
program.usage(`<template-type> <project-name>
  初始化一个项目
  template-type 模版类型 支持 egg
  project-name 项目名称`)
program.parse(process.argv);

const pkgs = program.args;
const distributeTheOrder = (pkgs) => {
  if (pkgs.length !== 2) {
    program.outputHelp();
    process.exit(1)
  }
  const [type, name] = pkgs;
  if (['egg', 'react'].includes(type)) {
    generator(type, name);
  }
}
distributeTheOrder(pkgs)
