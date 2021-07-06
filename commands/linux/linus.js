module.exports = {
    name: 'linus',
    description: 'Hello! This is Linus Torvalds.',
    execute: async ( interaction ) => {
        await interaction.editReply("https://youtu.be/-duTjbQuCxk");
    },
};