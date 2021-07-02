module.exports = {
    name: 'ping',
    description: "Get the websocket latency",
    testOnly: true,
    execute: async ( client, interaction ) => {

        await interaction.editReply(`Websocket latency is ${Math.round(client.ws.ping)}ms.`);
    },
};