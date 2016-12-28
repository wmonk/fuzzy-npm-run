#!/usr/bin/env node

const HARD_CODED = {
    s: 'start',
    t: 'test'
};
const chalk = require('chalk');
const readline = require('readline');
const run = require('./run');
const { join } = require('path');
const Fuse = require('fuse.js');

const [term, ...args]  = process.argv.slice(2);
const getScripts = dir => require(join(dir, 'package.json')).scripts;
const makeFullCmd = cmd => cmd.split(' ').concat(args.length ? ['--', ...args].join(' ') : []);

const showErrorScript = (msg = 'Something went wrong') => {
    console.log(chalk.bold.red(msg));
    console.log();
    console.log(chalk.dim('Possible scripts are: '));
    keys.forEach(({ key, cmd }) => console.log(`${chalk.bold.white(key)}\n  ${chalk.dim(cmd)}`));
    process.exit(1);
}

const scripts = getScripts(process.cwd());
const keys = Object.keys(scripts)
    .reduce((arr, key) => [...arr, {
        key,
        cmd: makeFullCmd(scripts[key])
    }], []);

if (!term || (term === '')) {
    return showErrorScript('No serch term provided');
}

if (HARD_CODED[term]) {
    const script = scripts[HARD_CODED[term]];
    return run(makeFullCmd(script));
}

const list = new Fuse(keys, { tokenize: true, shouldSort: true, keys: ['key'] });
const matches = list.search(term);

if (matches.length === 0) {
    return showErrorScript('No matching script found:');
}

if (matches.length === 1) {
    console.log(chalk.green(`Found cmd:`), chalk.green.bold(matches[0].key));
    run(matches[0].cmd)
        .then(() => console.log(chalk.green.bold('Finished')))
        .catch(err => showErrorScript(err.message));
}

if (matches.length > 1) {
    console.log(chalk.blue.bold('Found multiple commands:'));
    const opts = matches.map(({ key }, i) => `${i + 1}) ${chalk.blue(key)}`).concat(`${matches.length + 1}) all`).join('\n');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question(`Which command do you want to run?\n${opts}\n`, (answer) => {
        rl.close();
        if (Number(answer) === matches.length + 1) {
            return Promise.all(matches.map(match =>
                            run(match.cmd)
                        )).then(() => console.log(chalk.green.bold('Finished')))
                .catch(err => showErrorScript(err.message));
        }

        if (isNaN(Number(answer)) || Number(answer) > matches.length) {
            return showErrorScript('Not a valid option');
        }

        run(matches[Number(answer - 1)].cmd)
            .then(() => console.log(chalk.green.bold('Finished')))
            .catch(err => showErrorScript(err.message));
    });
}


