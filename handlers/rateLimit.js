// TODO: Finish

async function initRateLimitHandler(client) {
    let rateLimited;

    client.on("rateLimit", (rateLimitInfo) => {
        client.logs.warn(`I am rate-limited for ${rateLimitInfo.timeout}ms`)
        rateLimited = true;
        sleep(rateLimitInfo.timeout);
        rateLimited = false;
    })
}

module.exports = { initRateLimitHandler, rateLimited }