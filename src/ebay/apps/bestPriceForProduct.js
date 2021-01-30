const Ebay = require('ebay-node-api');
const { ebay } = require('../../config/config');

/**
 * Indicator app with 5 frames:
 * Frame 1: Title of product specified by user
 * Frame 2: Current best price for product
 * Frame 3: Difference between current best price and goal specified by user
 * Frame 4: Amount of offers for product
 * Frame 5: Sparkline with prices of the 7 best priced items
 * 
{
  "frames": [
      {
          "text": "4K TV 50 Inch",
          "icon": "a15297" // ebay icon
      },
      {
          "text": "799,99 €",
          "icon": "i635" // star icon
      },
      {
          "text": "-20 €",
          "icon": "i10726" // i10726 (cross) if item is greater than goal - i59 (confirm) if price is lower than goal
      },
      {
          "text": "32 Offers",
          "icon": null
      },
      {
          "index": 4,
          "chartData": [
              799,
              800,
              850,
              900,
              950,
              1200,
              1500,
          ]
      }
  ]
}
 */

const handleResult = (result) => {
  // eslint-disable-next-line no-console
  console.log(result);
  const refinedResult = {
    frames: [
      {
        text: '4K TV 50 Inch',
        icon: 'a15297',
      },
      {
        text: '799,99 €',
        icon: 'i635',
      },
      {
        text: '-20 €',
        icon: 'i10726',
      },
      {
        text: '32 Offers',
        icon: null,
      },
      {
        index: 4,
        chartData: [799, 800, 850, 900, 950, 1200, 1500],
      },
    ],
  };
  return refinedResult;
};

const getBestPriceForProduct = (options) => {
  const getBestPriceForProductClient = new Ebay({
    clientID: ebay.ebayClientId, // Client Id key provided when you register in eBay developers program.
    limit: 7, // fetch items functionality - Number that limits the number of data you need in response.
    countryCode: options.market, // sets the GLOBAL-ID parameter which specifies the eBay site to use for searches
    // http request headers -> https://developer.ebay.com/api-docs/static/rest-request-components.html#HTTP
    headers: {
      'Accept-Charset': 'utf-8',
      'Accept-Encoding': 'application/gzip',
    },
  });
  if (options.mode === 'byKeyword') {
    const results = getBestPriceForProductClient.findItemsByKeywords({
      keywords: options.payload,
      sortOrder: 'PricePlusShippingLowest', // https://developer.ebay.com/devzone/finding/callref/extra/fndcmpltditms.rqst.srtordr.html
    });
    return handleResult(results);
  }
  if (options.mode === 'byProduct') {
    const results = getBestPriceForProductClient.findItemsByProduct({
      productId: Number.parseInt(options.payload, 10),
      sortOrder: 'PricePlusShippingLowest', // https://developer.ebay.com/devzone/finding/callref/extra/fndcmpltditms.rqst.srtordr.html
    });
    return handleResult(results);
  }
};

module.exports = {
  getBestPriceForProduct,
};
