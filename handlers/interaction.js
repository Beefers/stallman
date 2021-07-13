function initInteractionHandler(client) {
    // Fetch our application, if not already fetched
    if (!client.application?.owner) client.application?.fetch();

    // Make an array to store info on local commands we've fetched
    var commandsToRegister = []

    // Register each command with their properties
    client.localCommands.array().forEach(command => {
        commandsToRegister.push({
            name: command.name,
            description: command.description,
            options: command.options,
        })
    })

    // Set commands in every server defined in config
    // TODO: Global commands
    client.config.routes.servers.forEach(id => {
        client.guilds.cache.get(id).commands.set(commandsToRegister)
        .catch(client.logs.error())
    })
}