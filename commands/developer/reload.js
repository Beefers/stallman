const fs = require('fs');

module.exports = {
    name: 'reload',
    description: 'Reloads a command.',
    category: 'developer',
    options: [
        {
            name: 'command',
            description: 'What command should I reload?',
            type: 'STRING',
            required: true,
        },
    ],
    execute: async ( interaction ) => {
        // adapted from https://discordjs.guide/command-handling/adding-features.html#reloading-commands
        // TODO: rewrite

        const client = interaction.client

        const commandName = interaction.options.get('command').value.toLowerCase();

		const command = client.localCommands.get(commandName)
			|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return interaction.editReply(`There is no command with name \`${commandName}\`!`);
		}

		const commandFolders = fs.readdirSync('./commands');
		const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`));

		delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

		try {
			const newCommand = require(`../${folderName}/${command.name}.js`);
			client.localCommands.set(newCommand.name, newCommand);
			interaction.editReply(`Command \`${newCommand.name}\` was reloaded!`);
		} catch (error) {
			console.error(error);
			interaction.editReply(`There was an error while reloading \`${command.name}\`:\n\`\`\`${error.message}\`\`\``);
		}
    },
};