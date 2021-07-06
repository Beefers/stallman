const Discord = require('discord.js')

module.exports = {
    name: 'vizality',
    description: 'why do i make these things - beef',
    execute: async ( interaction ) => {
        const client = interaction.client
        var username = interaction.user.username
        const placeholder = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare tellus nec dapibus finibus. Nulla massa velit, mattis non eros a, interdum tristique massa. Curabitur mauris sem, porttitor quis ligula vitae, suscipit hendrerit quam. Nunc sit amet enim id elit vehicula tempus sed sed tellus. Aliquam felis turpis, malesuada ut tortor id, iaculis facilisis felis.'

        const crashEmbed = new Discord.MessageEmbed()
            .setColor('#2F3136')
            .setTitle('Well, this is awkward')
            .setDescription('Looks like Discord has crashed unexpectedly....\nWe\'ve tracked the error and will get right on it.')

        const crashRow = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setCustomID('crashButton')
                .setStyle('PRIMARY')
                .setLabel('Reload')
        )

        const dashboardEmbed = new Discord.MessageEmbed()
                .setTitle(`Welcome, ${interaction.user.username}!`)
                .setDescription('You\'ve made the right choice. The power of customization is now at your fingertips. Check out the features below to learn how to harness your newfound power.')
                // .setImage("https://i.imgur.com/fIIzj3q.png")
                .setImage('https://media.discordapp.net/attachments/829809799553482764/851591251249463336/unknown.png')
                .setColor("#ff006a")

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

        const pluginsEmbed = new Discord.MessageEmbed()
            .setTitle(`Plugins`)
            .setDescription(placeholder)
            .addField('Installed', '\u200B', true)
            .addField('Discover', '\u200B', true)
            .addField('Browse', '\u200B', true)
            .setColor("#ff006a")
        
        const pluginsRow = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageSelectMenu()
                    .setCustomID('pluginsSelect')
                    .setPlaceholder('Select a plugin')
                    .addOptions([
                        {
                            label: 'mock | 1.0.0 | rem',
                            emoji: '<:mockIcon:862086009743474758>',
                            description: 'Lets you mock people for their dumb mistakes',
                            value: 'mockPlugin',
                        },
                        {
                            label: 'mlv3 | 69.42.0 | light',
                            emoji: '<:mlv3Icon:862086041120407573>',
                            description: 'omg moessgaleo lgoer?! v3?!?',
                            value: 'mlv3Plugin',
                        },
                    ]),
            )
            
        interaction.editReply({ content: '\u200B', embeds: [dashboardEmbed], components: [dashboardRow] })

        client.on('interaction', async buttonInteraction => {
            if (!buttonInteraction.isButton()) return;
            // await buttonInteraction.defer();
            try {
                switch (buttonInteraction.customID) {
                    case 'crashButton':
                        await buttonInteraction.message.edit({ content: '\u200B', embeds: [dashboardEmbed], components: [dashboardRow] })
                    break

                    case 'pluginsButton':
                        await buttonInteraction.message.edit({ content: '\u200B', embeds: [pluginsEmbed], components: [pluginsRow] })
                } 
            } catch(error) {
                console.log(error)
                await buttonInteraction.message.edit({ content: '\u200b', embeds: [crashEmbed], components: [crashRow] })
            }
        });
    },
};