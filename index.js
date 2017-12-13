#!/usr/bin/env node
'use strict';

const program = require('commander'), 
    chalk = require('chalk'), 
    prompt = require('prompt'), 
    pkg = require('./package.json'), 
    inquirer = require('inquirer'),
    https = require('https');

const version = '0.0.1-alpha'
const desc = {
    desc: "This is a CLI made on Node.JS to check the stats of NPM packages and GitHub open source projects.",
    init: "This command will initialize the CLI by saving your NPM package and GitHub repo details."
}
let url = "https://api.npms.io/v2/package/";

let initFunc = (options) =>    {

    console.log(chalk.green.bold("Hey there!"));
    let fullCommand = 'init';
    if(options.npm) {
        console.log(chalk.yellow.bold("Let's initialize your NPM account."));
        console.log(chalk.white.bold('...'));
        let noAnswer = true;
        let question = {
            type: "input",
            name: "package",
            message: chalk.yellow.bold("Please enter your npm package name: ")
        };
        
        let input = getInput(question);
        
    }   else if(options.github) {
        console.log(chalk.yellow.bold("Let's initialize your GitHub account."));
    }
}

let getInput = (question) =>    {
    inquirer.prompt([question]).then(answers => {
        if(answers.package == '')   {
            console.log(answers.package);
            onErr(chalk.red.bold("Please enter a valid package name"));
            getInput(question);
        }   else    {
            console.log(chalk.green.bold(`You have added '`) +  chalk.red.bold(`${answers.package}`) + chalk.green.bold(`' package.`));
            let query = url + "" + answers.package;
            console.log(query);
            https.get(query, (res) => {
                let data = '';
                res.on('data', (chunk) =>    {
                    data += chunk; 
                });
                res.on('end', () =>    {
                    // console.log(JSON.parse(data));
                    console.log(JSON.parse(data).collected.npm);
                    console.log(JSON.parse(data).collected.github);
                    // npmData(JSON.parse(data).collected);
                });
              }).on('socket', (socket) => {
                socket.emit('agentRemove');
              }).on('error', (err) =>   {
                onErr(chalk.red.bold("Error:") + chalk.red.bold(err));
              });
            return answers;
        }
    });
}

let npmData = (data) => {
    let stars, forks, subscriber, issues;
    console.log(chalk.green.bold("Stats for the NPM package:"));
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