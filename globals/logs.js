// Import Chalk
const chalk = require('chalk')

module.exports = {
    //* clientLog
    //? A console.log wrapper used for logging any info about the client, and making it look nice.
    clientLog: async function(content) { console.log(chalk.blue('Stallman-Client') + chalk.grey(' | ') +  chalk.green(content)) },

    //* errorLog
    //? A console.error wrapper used for logging any errors, and making it easily visible.
    errorLog: async function(content) { console.error(chalk.red('Stallman-Error') + chalk.grey('  | ') +  chalk.white(content)) },
}