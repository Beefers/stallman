const Discord = require('discord.js')

module.exports = {
    name: 'components',
    description: 'Things made with Discord\'s new message components.',
    category: 'test',
    options: [
        {
            name: 'buttons',
            description: 'Sends a message with buttons.',
            type: 'SUB_COMMAND',
        },
        // {
        //     name: 'board',
        //     description: 'Sends a drawing board made with buttons and ActionRows.',
        //     type: 'SUB_COMMAND',
        // },
        {
            name: 'select',
            description: 'Sends a message with a select component.',
            type: 'SUB_COMMAND',
        },
    ],
    execute: async ( interaction ) => {
        const client = interaction.client

        const args = interaction.options
        switch(args[0].name) {
            case 'buttons':
                const row = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                        .setCustomId('red')
                        .setStyle('DANGER')
                        .setLabel('This is a red button')
                    )
                    
                interaction.editReply({ content: "Buttons!", components: [row] })

                client.on('interactionCreate', async buttonInteraction => {
                    if (!buttonInteraction.isButton()) return;
                    await buttonInteraction.defer({ ephemeral: true });
                    await buttonInteraction.editReply(`You clicked the ${buttonInteraction.customId} button.`)
                });
            break

            case 'board':
                // const boardRow = new Discord.MessageActionRow()
                //     .addComponents(
                //         new Discord.MessageButton()
                //             .setCustomId('boardButton1')
                //             .setStyle('SECONDARY')
                //             .setLabel('\u200B'),
                //         new Discord.MessageButton()
                //             .setCustomId('boardButton2')
                //             .setStyle('SECONDARY')
                //             .setLabel('\u200B'),
                //         new Discord.MessageButton()
                //             .setCustomId('boardButton3')
                //             .setStyle('SECONDARY')
                //             .setLabel('\u200B'),
                //         new Discord.MessageButton()
                //             .setCustomId('boardButton4')
                //             .setStyle('SECONDARY')
                //             .setLabel('\u200B'),
                //         new Discord.MessageButton()
                //             .setCustomId('boardButton5')
                //             .setStyle('SECONDARY')
                //             .setLabel('\u200B'),
                //     )
                    
                // interaction.editReply({ content: '\u200B', components: [boardRow, boardRow, boardRow, boardRow, boardRow] })

                // client.on('interactionCreate', async buttonInteraction => {
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
                            .setCustomId('select')
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
                    
                    client.on('interactionCreate', async selectInteraction => {
                        if (!selectInteraction.isSelectMenu()) return;
                        await selectInteraction.defer({ ephemeral: true });
                        await selectInteraction.editReply(`You selected ${selectInteraction.values[0]}.`)
                    });
                    
            break
        }
    },
};