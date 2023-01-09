#!/usr/bin/env node
const { Command } = require('commander');
const inquirer = require('inquirer');
const generator = require('./generator');
const program = new Command();

program.parse(process.argv);


const questions = [
  {
    type: 'list',
    name: 'type',
    message: 'Please select templete type',
    choices: [
      'egg',
      'react',
      'turbo',
     ],
     default() {
      return 'turbo';
    },
  },
   {
     type: 'input',
     name: 'name',
     message: "Please select templete name",
     default() {
       return 'home';
     },
     validate(value) {
      if (value) {
        return true;
      }

      return 'Please select templete name';
    },
   },
 ];
 
 inquirer.prompt(questions).then((answers) => {
   const { type,name } = answers
   generator(type,name)
 });
