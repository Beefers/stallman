module.exports = {
    description: "A simple test command.",
    cooldown: false,
    testOnly: true,
    execute: async ({ interaction }) => {
        interaction.acknowledge();
        await interaction.edit("nice test");
    },
};