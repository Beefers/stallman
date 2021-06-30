//? Richard Stallman
//? A Discord bot made with Slashcord

// Import Discord
const Discord = require("discord.js");

// Import WOKCommands
const WOKCommands = require('wokcommands')

// Define the client
const client = new Discord.Client({
    // Use recommended partials for the built-in help menu
    partials: ['MESSAGE', 'REACTION']
})

// Add our config to the client
client.config = require('./config/bot')

// When the client is ready, Initialize Slashcord and it's arguments
client.on("ready", () => {
  // const instance = new Slashcord(client, "commands", {
  //     testServers: [client.config.routes.server.id],
  //     botOwners: [client.config.users.owner.id],
  //     useButtons: true,
  // })
  new WOKCommands(client, {
    // The name of the local folder for your command files
    commandsDir: 'commands',
    
    // The name of the local folder for your feature files
    featuresDir: 'events',
    
    // If WOKCommands warnings should be shown or not
    showWarns: true,
    
    // Prevent triggering by other bots
    ignoreBots: true,
    
    // What server/guild IDs are used for testing only commands & features
    // Can be a single string if there is only 1 ID
    testServers: [client.config.routes.server.id],
    
    // What built-in commands should be disabled.
    // Note that you can overwrite a command as well by using
    // the same name as the command file name.
    disabledDefaultCommands: [
        'help',
        'command',
        'language',
        'prefix',
        'requiredrole'
    ]
  })
   
  client.user.setActivity(client.config.vanity.activity.value, { type: client.config.vanity.activity.type });
});

// Log in with token
client.login(client.config.discord.token);