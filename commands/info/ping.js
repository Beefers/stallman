module.exports = {
    name: 'ping',
    description: 'Get the websocket latency',
    category: 'info',
    execute: async ( interaction ) => {
        const client = interaction.client
        await interaction.editReply(`Websocket latency is ${Math.round(client.ws.ping)}ms.`);
    },
};