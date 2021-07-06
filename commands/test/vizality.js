const Discord = require('discord.js')

module.exports = {
    name: 'vizality',
    description: 'why do i make these things - beef',
    execute: async ( interaction ) => {
        const client = interaction.client
        const dashboardRow = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setCustomID('pluginsButton')
                            .setStyle('PRIMARY')
                            .setLabel('Browse Plugins'),
                            
                        new Discord.MessageButton()
                            .setCustomID('themesButton')
                            .setStyle('PRIMARY')
                            .setLabel('Browse Themes'),

                        new Discord.MessageButton()
                            .setCustomID('devButton')
                            .setStyle('PRIMARY')
                            .setLabel('Learn How'),

                        new Discord.MessageButton()
                            .setCustomID('docsButton')
                            .setStyle('PRIMARY')
                            .setLabel('Start Reading'),
                    )

                const dashboardEmbed = new Discord.MessageEmbed()
                        .setTitle(`Welcome, ${interaction.user.username}!`)
                        .setDescription('You\'ve made the right choice. The power of customization is now at your fingertips. Check out the features below to learn how to harness your newfound power.')
                        .setImage("https://i.imgur.com/fIIzj3q.png")
                        .setColor("#ff006a")
                    
                interaction.editReply({ content: '\u200B', embeds: [dashboardEmbed], components: [dashboardRow] })

                client.on('interaction', async buttonInteraction => {
                    if (!buttonInteraction.isButton()) return;
                    await buttonInteraction.defer({ ephemeral: true });
                    await interaction.editReply()
                });
    },
};