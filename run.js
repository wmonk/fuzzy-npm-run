const { spawn } = require('child_process')
const chalk = require('chalk');

function runner (app) {
  return new Promise(function (resolve, reject) {
    console.log(chalk.dim(`Running ${app.join(' ')}`));
    const npm = spawn(app[0], app.slice(1), { stdio: 'inherit' }, err => err ? reject(err) : resolve())

    npm.on('stdout', console.log.bind(console));
    npm.on('stderr', console.error.bind(console));
  })
}

module.exports = runner;
