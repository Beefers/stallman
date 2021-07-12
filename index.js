//? Stallman
//? Beef's personal Discord bot.

// Import Discord.JS as a constructor
const Discord = require('discord.js')

// Make a client from the Discord constructor and define it
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });