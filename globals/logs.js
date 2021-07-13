// Import Chalk
const chalk = require('chalk')

module.exports = {
    //* clientLog
    //? A console.log wrapper used for logging any info about the client, and making it look nice.
    clientLog: function(content) { console.log(chalk.blue('Stallman-Client') + chalk.grey(' | ') +  chalk.green(content)) },

    //* errorLog
    //? A console.log wrapper used for logging any erros, and making it easily visible.
    errorLog: function(content) { console.log(chalk.red('Stallman-Error') + chalk.grey('  | ') +  chalk.white(content)) },
}