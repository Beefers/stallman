async function init(client) {
    const fullPermissions = []
    if (!client.application?.owner) client.application?.fetch();
    
    client.config.routes.servers.forEach(id => {
        client.localCommands.forEach(localCommand => {
            fullPermissions.push({
                id: client.guilds.cache.get(id).commands.fetch().then(commands => commands.filter(command => command.name === localCommand.name).id),
                permissions: localCommand.permssions || '',
            })
            console.log(fullPermissions)
        })
        client.guilds.cache.get(id)?.commands.permissions.set({ fullPermissions });
    })
}

module.exports = { init }