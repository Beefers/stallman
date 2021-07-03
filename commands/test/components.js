const Discord = require('discord.js')

module.exports = {
    name: 'components',
    description: 'Things made with Discord\'s new message components.',
    options: [
        {
            name: 'buttons',
            description: 'Sends a message with buttons.',
            type: 'SUB_COMMAND',
        },
        {
            name: 'board',
            description: 'Sends a drawing board made with buttons and ActionRows.',
            type: 'SUB_COMMAND',
        },
        {
            name: 'select',
            description: 'Sends a message with a select component.',
            type: 'SUB_COMMAND',
        },
    ],
    execute: async ( interaction ) => {
        const client = interaction.client

        const args = interaction.options.array()
        switch(args[0].name) {
            case 'buttons':
                const row = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                        .setCustomID('red')
                        .setStyle('DANGER')
                        .setLabel('This is a red button')
                    )
                    
                interaction.editReply({ content: "Buttons!", components: [row] })

                client.on('interaction', async buttonInteraction => {
                    if (!buttonInteraction.isButton()) return;
                    await buttonInteraction.defer({ ephemeral: true });
                    await buttonInteraction.editReply(`You clicked the ${buttonInteraction.customID} button.`)
                });
            break

            case 'board':
                // const boardRow = new Discord.MessageActionRow()
                //     .addComponents(
                //         new Discord.MessageButton()
                //             .setCustomID('boardButton1')
                //             .setStyle('SECONDARY')
                //             .setLabel('\u200B'),
                //         new Discord.MessageButton()
                //             .setCustomID('boardButton2')
                //             .setStyle('SECONDARY')
                //             .setLabel('\u200B'),
                //         new Discord.MessageButton()
                //             .setCustomID('boardButton3')
                //             .setStyle('SECONDARY')
                //             .setLabel('\u200B'),
                //         new Discord.MessageButton()
                //             .setCustomID('boardButton4')
                //             .setStyle('SECONDARY')
                //             .setLabel('\u200B'),
                //         new Discord.MessageButton()
                //             .setCustomID('boardButton5')
                //             .setStyle('SECONDARY')
                //             .setLabel('\u200B'),
                //     )
                    
                // interaction.editReply({ content: '\u200B', components: [boardRow, boardRow, boardRow, boardRow, boardRow] })

                // client.on('interaction', async buttonInteraction => {
                //     if (!buttonInteraction.isButton()) return;
                //     await buttonInteraction.defer({ ephemeral: true });
                //     await interaction.editReply()
                // });
                interaction.editReply('This command is not done yet, sorry.')
            break

            case 'select':
                const selectRow = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageSelectMenu()
                            .setCustomID('select')
                            .setPlaceholder('Select an option')
                            .addOptions([
                                {
                                    label: 'Select me',
                                    description: 'This is a description',
                                    value: 'first_option',
                                },
                                {
                                    label: 'You can select me too',
                                    description: 'This is also a description',
                                    value: 'second_option',
                                },
                            ]),
                    );
                    await interaction.editReply({ content: 'Select!', components: [selectRow] });
                    
                    client.on('interaction', async selectInteraction => {
                        if (!selectInteraction.isSelectMenu()) return;
                        await selectInteraction.defer({ ephemeral: true });
                        await selectInteraction.editReply(`You selected ${selectInteraction.values[0]}.`)
                    });
                    
            break
        }
    },
};