const { MessageEmbed } = require('discord.js')
const beautify = require("beautify");

module.exports = {
    name: 'eval',
    description: 'Runs code as JS. Only available to developers.',
    category: 'developer',
    defaultPermission: false,
    permissions: [
        {
            // TODO: Attempt to fetch owner id from config without requiring it - may be impossible?
            id: '257109471589957632',
            type: 'USER',
            permission: true,
        }
    ],
    options: [
        {
            name: 'code',
            description: 'What code should I run?',
            type: 'STRING',
            required: true,
        },
    ],
    execute: async ( interaction ) => {
        const client = interaction.client
        if (interaction) {
            if (interaction.user.id !== client.config.users.owner.id) {
                const embed = new MessageEmbed()
                .setColor("RED")
                .setTitle(":x: Error")
                .setDescription("You need to be \`" + client.users.cache.get(client.config.users.owner.id).username + "#" + client.users.cache.get(client.config.users.owner.id).discriminator + "\` to run this command.")
                return await interaction.editReply({ embeds: [embed] });
            }
        }

        const toEval = interaction.options.get('code').value

        if (!toEval) return await interaction.editReply('You didn\'t give any arguments.')
        
        try {
            const before = Date.now();
            const evaluated = eval(toEval);
            const took = Date.now() - before;

            const embed = new MessageEmbed()
                .setColor("#2F3136")
                .addField("Operation:", `\`\`\`js\n${beautify(toEval.toString(), { format: "js" })}\n\`\`\``)
                .addField(`Time taken:`, `(${took}ms)`, true)

                if (evaluated) {
                    embed.addField("Evaluated:", evaluated.toString(), true)
                    embed.addField("TypeOf:", typeof(evaluated), true)
                }

            return await interaction.editReply({ embeds: [embed] })
        } catch (error) {
            client.logs.errorLog(error)
            const embed = new MessageEmbed()
                .setColor("RED")
                .setTitle(":x: Error")
                .setDescription("Sorry, but I couldn't evaluate that.")
                .addField("Operation:", `\`\`\`js\n${beautify(toEval.toString(), { format: "js" })}\n\`\`\``)
                .addField("**Error:**", `\`\`\`${error}\`\`\``, true)

            return await interaction.editReply({ embeds: [embed] });
        }
    }
};