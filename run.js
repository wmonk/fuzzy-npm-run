const spawn = require('cross-spawn')
const chalk = require('chalk');

function runner (app) {
  return new Promise(function (resolve, reject) {
    console.log(chalk.dim(`Running ${app.join(' ')}`));
    var npm = spawn(app[0], app.slice(1), { stdio: 'inherit' })
    var testErrors = ''

    npm.on('error', function (err) {
      console.error(err)
      testErrors += err.toString()
    })

    npm.on('exit', function (code) {
      if (code) {
        reject({
          code: code,
          errors: testErrors
        })
        return
      }
      resolve()
    })
  })
}

module.exports = runner;
