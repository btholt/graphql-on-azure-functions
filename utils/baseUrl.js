const hostname = process.env.WEBSITE_HOSTNAME;
module.exports = hostname ? `https://${hostname}` : 'http://localhost:7071';