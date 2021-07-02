//? Richard Stallman
//? Beef's personal Discord bot.

// Import fs
const fs = require('fs');

// Import Discord
const Discord = require("discord.js");

// Define the client
const client = new Discord.Client({ intents: [Discord.Intents.ALL] });

// Make a commands collection
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

// Add our config to the client
client.config = require('./config/bot')

// When the client is ready
client.once("ready", () => {
  // Set the activity
  client.user.setActivity(client.config.vanity.activity.value, { type: client.config.vanity.activity.type });

  // Fetch our application
  if (!client.application?.owner) client.application?.fetch();

  // Log all commands
  console.log(client.commands.map(command => command.name).join(', '))

  var fetchedCommands = []

  // Register commands
  client.commands.array().forEach(command => {
    fetchedCommands.push({
      name: command.name,
      description: command.description,
      options: command.options,
    })
  })
  // Set commands
  client.guilds.cache.get(client.config.routes.server.id).commands.set(fetchedCommands)
    .catch(console.error);
});

// Handle interactions
client.on('interaction', async interaction => {
	if (!interaction.isCommand()) return;
	const command = interaction.commandName;

	if (!client.commands.has(command)) return;

	try {
    await interaction.defer()
		client.commands.get(command).execute(interaction);
	} catch (error) {
		console.error(error);
		// interaction.channel.send(`Command raised an exception\n\`\`\`${error}\`\`\``);
	}
});

// Log in with token
client.login(client.config.discord.token);