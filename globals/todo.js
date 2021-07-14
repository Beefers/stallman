module.exports = {
    items: [
        {
            name: 'Command permissions',
            description: 'Discord.JS has native support for Slash Command permissions. We need to implement this into our command handler.',
            status: 'no_progress',
        },
        {
            name: 'Refactor commands',
            description: 'Now that every command is migrated from legacy, we should rewrite/refactor each one.',
            status: 'in_progress',
        },
        {
            name: 'Message handler',
            description: 'Perhaps implement a message handler to allow for non-slash commands.',
            status: 'no_progress',
            optional: true,
        },
        {
            name: 'Migrate commands',
            description: 'We need to migrate every single command that was in the bot pre-rewrite to this new codebase.',
            status: 'done',
        }
    ]
}