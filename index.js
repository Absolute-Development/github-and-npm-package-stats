#!/usr/bin/env node
'use strict';

const program = require('commander'), 
chalk = require("chalk"), 
prompt = require('prompt'), 
pkg = require('./package.json'), 
inquirer = require('inquirer');

const version = '0.0.1-alpha'
const desc = {
    desc: "This is a CLI made on Node.JS to check the stats of NPM packages and GitHub open source projects.",
    init: "This command will initialize the CLI by saving your NPM package and GitHub repo details."
}

let initFunc = (options) =>    {

    console.log(chalk.green.bold("Hey there!"));
    let fullCommand = 'init';
    if(options.npm) {
        console.log(chalk.yellow.bold("Let's initialize your NPM account."));
        console.log(chalk.white.bold('...'));
        // console.log(chalk.yellow.bold("Please enter your npm package name: "));
        
        // prompt.start();
        // prompt.get(['package'], function (err, result) {
        //     if (err)    return onErr(err);
        //     if(result.package == '')    return onErr(err);
        //     console.log(chalk.green.bold(`You have added `) +  chalk.red.bold(`${result.package}`) + chalk.green.bold(` package.`));

        // });
        let noAnswer = true;
        let question = {
            type: "input",
            name: "package",
            message: chalk.yellow.bold("Please enter your npm package name: ")
        };

        let input = "error";
        while(input == "error") {
            input = getInput(question);
        }
        
    }   else if(options.github) {
        console.log(chalk.yellow.bold("Let's initialize your GitHub account."));
    }
}

let getInput = (question) =>    {
    inquirer.prompt([question]).then(answers => {
        if(answers.package == '')   {
            console.log(answers.package);
            onErr(chalk.red.bold("Please enter a valid package name"));
            return "error";
        }   else    {
            console.log(chalk.green.bold(`You have added `) +  chalk.red.bold(`${answers.package}`) + chalk.green.bold(` package.`));
            return answers;
        }
    });
}

program.version(version)
    .command('init')
    .description(desc.init)
    .option('-npm, --npm', 'Add NPM package.')
    .option('-github, --github', 'Add GitHub repo.')
    .action(initFunc);

program.parse(process.argv);

let onErr = (err) =>   {
    console.log(err);
}

if (program.args.length === 0) program.help();