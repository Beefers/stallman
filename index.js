//? Stallman
//? Beef's personal Discord bot.

// Import Discord.JS as a constructor
const Discord = require('discord.js');

// TODO: Perhaps migrate handlers into a single file?
// Import command handler
const { initCommandHandler } = require('./handlers/command');

// Import interaction handler
const { initInteractionHandler } = require('./handlers/interaction')

// Make a client from the Discord constructor and define it
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

// Add our config to the client
client.config = require('./config/bot')

// Add some needed globals to the client
// Logging
client.logs = require('./utils/logs')

// Run actions when the client is ready
client.once('ready', () => {
    // Initialise command handler
    initCommandHandler(client)

    // Initialise interaction handler
    initInteractionHandler(client)

    // Set activity based on config file
    client.user.setActivity(client.config.vanity.activity.value, { type: client.config.vanity.activity.type }); 

    // Log that we're ready to go
    client.logs.clientLog('Ready!')
})

// Login with our token
client.login(client.config.auth.token)