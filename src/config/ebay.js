const eBay = require('ebay-node-api');

const { ebay } = require('./config');

// eslint-disable-next-line new-cap
const ebayClient = new eBay({
  clientID: ebay.ebayClientId, // Client Id key provided when you register in eBay developers program.
  limit: 5, // fetch items functionality - Number that limits the number of data you need in response.
  env: 'PRODUCTION', // Environment, default value is PRODUCTION.
  countryCode: 'EBAY-DE', // sets the GLOBAL-ID parameter which specifies the eBay site to use for searches
  // http request headers -> https://developer.ebay.com/api-docs/static/rest-request-components.html#HTTP
  headers: {
    'Accept-Charset': 'utf-8',
    'Accept-Encoding': 'application/gzip',
    'Accept-Language': 'de-DE',
    'Content-Language': 'de-DE',
    'Content-Type': 'application/json',
    'X-EBAY-C-MARKETPLACE-ID': 'EBAY_DE',
    'X-EBAY-C-ENDUSERCTX': 'contextualLocation=country=DE',
  },
});

module.exports = {
  ebayClient,
};
