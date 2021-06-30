module.exports = {
    name: 'ping',
    description: "Get the websocket latency",
    cooldown: false,
    testOnly: true,
    execute: async ({ client, interaction }) => {
        interaction.acknowledge();
        await interaction.edit(`Websocket latency is ${Math.round(client.ws.ping)}ms.`);
    },
};