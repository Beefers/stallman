//? Richard Stallman
//? A Discord bot made with Slashcord

// Import Discord
const Discord = require("discord.js");

// Import Slashcord
const Slashcord = require("slashcord").default;

// Define the Client
const client = new Discord.Client();

// Add our config to the client
client.config = require('./config/bot')

// Import our interactions library
const interactions = require("discord-slash-commands-client");

// Define an interactions client
const iclient = new interactions.Client(
  client.config.discord.token,
  client.config.discord.clientId
);

// Add it to the main discord.js client
client.iclient = iclient

// When the client is ready, Initialize Slashcord and it's arguments
client.on("ready", () => {
   new Slashcord(client, "commands", {
      testServers: [client.config.routes.server.id],
      botOwners: [client.config.users.owner.id],
      useButtons: true,
    })
   
   client.user.setActivity(client.config.vanity.activity.value, { type: client.config.vanity.activity.type });
});

// Log in with token
client.login(client.config.discord.token);