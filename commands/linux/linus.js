module.exports = {
    name: 'linus',
    description: "Hello! This is Linus Torvalds.",
    cooldown: false,
    testOnly: true,
    execute: async ({ interaction }) => {
        interaction.acknowledge();
        await interaction.edit("https://youtu.be/-duTjbQuCxk");
    },
};