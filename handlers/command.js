function initCommandHandler(client) {
    // Make a commands collection
    client.localCommands = new Discord.Collection();

    // Command management
    const commandFolders = fs.readdirSync('./commands');

    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`./commands/${folder}/${file}`);
            client.localCommands.set(command.name, command);
        }
    }

    // Log all local commands
    client.logs.clientLog(client.localCommands.map(command => command.name).join(', '))
}

module.exports = { initCommandHandler }