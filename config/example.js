// Import package.json to fetch useful info
const package = require("../package.json");

module.exports = {
    vanity: {
        activity: {
            value: `put an activity here | you can use properties from package.json too, like ${package.version}`,
            type: 'WATCHING' // You can use PLAYING, WATCHING and LISTENING
        }
    },

    discord: {
        token: 'put-your-bot\'s-token-here',
        clientId: 'put-your-bot\'s-token-here',
        publicKey: 'put-your-bot\'s-public-key-here',
    },
    
    routes: {
        server: {
            id: 'put-your-main-server-id-here',
        },
    },

    users: {
        owner: {
            id: 'put-your-own-id-here',
        },
    },
}