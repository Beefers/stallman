//? Stallman
//? Beef's personal Discord bot.

// Import Discord.JS as a constructor
const Discord = require('discord.js')

// Make a client from the Discord constructor and define it
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

// Add our config to the client
client.config = require('./config/bot')

// Add our globals to the client
client.logs = require('./globals/logs')

// Run actions when the client is ready
client.once('ready', () => {
    client.logs.clientLog('Ready!')
    client.logs.errorLog('This is a test error')
})

// Login with our token
client.login(client.config.auth.token)