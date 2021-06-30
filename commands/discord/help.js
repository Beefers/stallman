const Discord = require('discord.js')

module.exports = {
    name: 'help',
    description: "Lists out every command.",
    cooldown: false,
    options: [
        {
            name: 'command',
            description: 'What command should I fetch info on?',
            type: 3,
        }
    ],
    testOnly: true,
    execute: async ({ client, interaction, args }) => {
        interaction.acknowledge();
        const data = [];
		const { commands } = client;

        if (!args) {
            data.push(commands.map(command => command.name).join(', '))
            const helpEmbed = new Discord.MessageEmbed()
                .setTitle('Here\'s a list of all my commands:')
                .setColor('#2F3136')
                .setDescription(data)
                .setFooter(`You can send /help [command name] to get info on a specific command!`);

            return interaction.edit(helpEmbed)
        }

        const name = args[0].value.toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return interaction.edit('That\'s not a valid command!');
        }

        data.push(`**Name:** ${command.name}`);

        // if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        // if (command.options) data.push(`**Options:** ${command.options.join('\n')}`);

        const commandEmbed = new Discord.MessageEmbed()
            .setTitle(command.name)
            .setColor('#2F3136')
            .setDescription(data)

        await interaction.edit(commandEmbed);
    },
};