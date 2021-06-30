//? Richard Stallman
//? A Discord bot made with Slashcord

// Import fs
const fs = require('fs');

// Import Discord
const Discord = require("discord.js");

// Import Slashcord
const Slashcord = require('slashcord').default;

// Define the client
const client = new Discord.Client({
    partials: ['MESSAGE', 'REACTION']
})

// Make a commands collection to make up for Slashcord not having one
client.commands = new Discord.Collection();

// Command management
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

console.log(client.commands.map(command => command.name).join(', '))

// Add our config to the client
client.config = require('./config/bot')

// When the client is ready, Initialize Slashcord and it's arguments
client.on("ready", () => {
  const instance = new Slashcord(client, "commands", {
      testServers: [client.config.routes.server.id],
      botOwners: [client.config.users.owner.id],
      useButtons: true,
  })

  // Set the activity
  client.user.setActivity(client.config.vanity.activity.value, { type: client.config.vanity.activity.type });
});

// Log in with token
client.login(client.config.discord.token);