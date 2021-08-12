async function init(client) {
    const fullPermissions = []
    if (!client.application?.owner) client.application?.fetch();
    
    client.config.routes.servers.forEach(id => {
        client.guilds.cache.get(id).commands.fetch()
            .then(commands => commands.forEach(command => {
                fullPermissions.push({
                    id: command.id,
                    permissions: client.localCommands.filter(localCommand => localCommand.name === command.name).permssions,
                })
            }))
        client.guilds.cache.get(id)?.commands.permissions.set({ fullPermissions });
    })
}

module.exports = { init }