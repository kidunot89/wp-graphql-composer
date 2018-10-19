#! /usr/bin/env node
var program = require('commander');
var prompt = require('inquirer').prompt;
var actions = require('../scripts');

const init = {
  type: 'list',
  name: 'template',
  message: 'Select your template type',
  choices: ['Theme', 'Plugin'],
  filter: function(val) {
    return val.toLowerCase();
  }
};

program
  .version('0.0.1')
  .description('Tool for generating and managing Wordpress Plugin/Theme template files');

program
  .command('init')
  .description('setups working directory for WordPress plugin or theme template files')
  .option('-t, --test [value]', 'do a dry-run to set the potential changes', false)
  .action(function(args){
    prompt([init])
      .then(function(answers) {
        actions.init(answers.template, args.test);
      });
  });

program
  .command('build')
  .description('copies template files to build folder')
  .option('-d, --dir [value]', 'specific build directory', 'build')
  .action(function(args) {
    actions.build(args.dir);
  });

program.parse(process.argv);