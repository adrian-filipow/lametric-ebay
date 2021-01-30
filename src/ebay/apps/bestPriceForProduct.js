const Ebay = require('ebay-node-api');
const { ebay } = require('../../config/config');

const getBestPriceForProduct = (options) => {
  const getBestPriceForProductClient = new Ebay({
    clientID: ebay.ebayClientId, // Client Id key provided when you register in eBay developers program.
    limit: 7, // fetch items functionality - Number that limits the number of data you need in response.
    env: 'PRODUCTION', // Environment, default value is PRODUCTION.
    countryCode: options.market, // sets the GLOBAL-ID parameter which specifies the eBay site to use for searches
    // http request headers -> https://developer.ebay.com/api-docs/static/rest-request-components.html#HTTP
    headers: {
      'Accept-Charset': 'utf-8',
      'Accept-Encoding': 'application/gzip',
    },
  });
  const results = getBestPriceForProductClient.findItemsByKeywords({
    keywords: options.keywords,
    sortOrder: 'PricePlusShippingLowest', // https://developer.ebay.com/devzone/finding/callref/extra/fndcmpltditms.rqst.srtordr.html
  });
  return results;
};

module.exports = {
  getBestPriceForProduct,
};
