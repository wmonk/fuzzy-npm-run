const { exec } = require('child_process')
const chalk = require('chalk');

function runner (app) {
  return new Promise(function (resolve, reject) {
    console.log(chalk.dim(`Running ${app.join(' ')}`));
    const npm = exec(app.join(' '), { stdio: 'inherit' }, err => err ? reject(err) : resolve())

    npm.stdout.on('data', console.log.bind(console));
    npm.stderr.on('data', console.error.bind(console));
  })
}

module.exports = runner;
