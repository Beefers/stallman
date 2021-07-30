const Discord = require('discord.js')

module.exports = {
    name: 'help',
    description: 'Lists out every command.',
    category: 'info',
    options: [
        {
            name: 'command',
            description: 'What command should I fetch info on?',
            type: 'STRING',
        }
    ],
    execute: async ( interaction ) => {
        const client = interaction.client;

        const data = [];
		const { localCommands } = client;

        const args = interaction.options.get('command')

        if (!args) {
            // data.push(localCommands.map(command => command.name).join(', '))
            localCommands.array().forEach(command => {
                data.push(`**${command.name}** - ${command.description}`)
            })
            const helpEmbed = new Discord.MessageEmbed()
                .setTitle('Here\'s a list of all my commands:')
                .setColor('#2F3136')
                .setDescription(data.join('\n'))
                .setFooter(`You can send /help [command name] to get info on a specific command!`);

            return await interaction.editReply({ embeds: [helpEmbed] })
        }

        const name = args.value.toLowerCase();
        const command = localCommands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return await interaction.editReply('That\'s not a valid command!');
        }

        data.push(`**Name:** ${command.name}`);

        // if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.category) data.push(`**Category:** ${command.category}`)
        // if (command.options) data.push(`**Options:** ${command.options.join('\n')}`);

        const commandEmbed = new Discord.MessageEmbed()
            .setTitle(command.name)
            .setColor('#2F3136')
            .setDescription(data.join('\n'))

        await interaction.editReply({ embeds: [commandEmbed] });
    },
};