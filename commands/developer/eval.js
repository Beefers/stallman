const { MessageEmbed } = require('discord.js')
const beautify = require("beautify");
const fetch = require('node-fetch');

module.exports = {
    name: 'eval',
    description: "Runs code as JS. Only available to developers.",
    testOnly: true,
    cooldown: false,
    options: [
        {
            name: 'code',
            description: 'What code should I run?',
            type: '3',
        },
    ],
    execute: async ({ client, interaction, args }) => {
        interaction.acknowledge();
        if (interaction) {
            if (interaction.member.user.id !== client.config.users.owner.id) {
                const embed = new MessageEmbed()
                .setColor("RED")
                .setTitle(":x: Error")
                .setDescription("You need to be \`" + client.users.cache.get(client.config.users.owner.id).username + "#" + client.users.cache.get(client.config.users.owner.id).discriminator + "\` to run this command.")
                return interaction.edit(embed);
            }
        }

        if (!args) return interaction.edit('You didn\'t give any arguments.')
        
        try {
            const toEval = args[0].value;
            const before = Date.now();
            const evaluated = eval(toEval);
            const took = Date.now() - before;

            const embed = new MessageEmbed()
                .setColor("#2F3136")
                .addField("Operation:", `\`\`\`js\n${beautify(args[0].value, { format: "js" })}\n\`\`\``)
                .addField(`Time taken:`, `(${took}ms)`, true)

                if (evaluated) {
                    embed.addField("Evaluated:", evaluated, true)
                    embed.addField("TypeOf:", typeof(evaluated), true)
                }

            return interaction.edit(embed)
        } catch (error) {
            const embed = new MessageEmbed()
                .setColor("RED")
                .setTitle(":x: Error")
                .setDescription("Sorry, but I couldn't evaluate that.")
                .addField("Operation:", `\`\`\`js\n${beautify(args[0].value, { format: "js" })}\n\`\`\``)
                .addField("**Error:**", `\`\`\`${error}\`\`\``, true)

            return await interaction.edit(embed);
        }
    }
};