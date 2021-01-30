const eBay = require('ebay-node-api');

const { ebay } = require('./config');

// eslint-disable-next-line new-cap
const ebayClient = new eBay({
  clientID: ebay.ebayClientId,
  env: ebay.ebayEnv,
  headers: {
    'X-EBAY-C-MARKETPLACE-ID': ebay.eBayHeadersCMarketplaceId,
  },
});

module.exports = {
  ebayClient,
};
