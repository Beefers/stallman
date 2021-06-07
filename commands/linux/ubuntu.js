module.exports = {
    description: "Ubuntu is the devil",
    cooldown: false,
    testOnly: true,
    execute: async ({ interaction }) => {
        interaction.acknowledge();
        await interaction.edit("https://www.youtube.com/watch?v=CP8CNp-vksc");
    },
};