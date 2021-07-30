const Discord = require('discord.js')

module.exports = {
    name: 'todo',
    description: 'Displays the todo list for this bot.',
    category: 'info',
    execute: async ( interaction ) => {
        const client = interaction.client
        const { items } = require('../../utils/todo')
        const todoEmbed = new Discord.MessageEmbed()
            .setTitle('Stallman To-do List')
            .setDescription('Here\'s everything Beef needs to do:')
            .setColor('#2F3136');
        
        items.forEach(item => {
            const details = []
            details.push(item.description, `Status: ${item.status}`)
            if (item.optional) {
                details.push(`Optional: ${item.optional}`)
            }

            todoEmbed.addField(item.name, details.join('\n\n'))
        })

        await interaction.editReply({ embeds: [todoEmbed] });
    },
};