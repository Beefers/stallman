module.exports = {
    name: 'absolutelyproprietary',
    description: "gnu",
    cooldown: false,
    testOnly: true,
    execute: async ({ interaction }) => {
        interaction.acknowledge();
        await interaction.edit("https://cdn.discordapp.com/attachments/829809799553482764/851170750484316200/absolutely_propeietary.png");
    },
};