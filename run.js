// @flow
const utils = require('./utils');
const proc = require('child_process')
const chalk = require('chalk');
const bprom = require('bluebird');

const exec = command => {
    const cmd = utils.removeEnvVars(command).split(' ');
    return new Promise(function (resolve, reject) {
        console.log(chalk.dim(`Running "${cmd.join(' ')}"`));
        const npm = proc.spawn(
                cmd[0],
                cmd.slice(1),
                {
                    stdio: 'inherit',
                    cwd: process.cwd(),
                    env: Object.assign(process.env, utils.getEnvVars(command))
                },
                err => {
                    console.log(err);
                    err ? reject(err) : resolve('doneee')
                });

        npm.on('stdout', console.log.bind(console));
        npm.on('stderr', console.error.bind(console));
        npm.on('close', code => code == 0 ? resolve() : reject(new Error(`${command} exited with code: ${code}`)));
    })
};

function runner (command) {
    // find out how to run the command(s)
    const runType = utils.runType(command);

    if (runType === utils.constants.NORMAL) {
        return exec(command);
    }

    if (runType === utils.constants.SERIES) {
        return bprom.mapSeries(utils.splitCmds(command), exec);
    }

    if (runType === utils.constants.CONCURRENT) {
        return bprom.map(utils.splitCmds(command), cmd => exec(cmd));
    }

    return exec(command);
}

module.exports = runner;
