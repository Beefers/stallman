// TODO: Finish

let rateLimited;

async function init(client) {
    client.on("rateLimit", (rateLimitInfo) => {
        client.logs.warn(`I am rate-limited for ${rateLimitInfo.timeout}ms`)
        rateLimited = true;
        sleep(rateLimitInfo.timeout);
        rateLimited = false;
    })
}

module.exports = { init, rateLimited }