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
          "text": "799,99 EUR",
          "icon": "i635" // star icon
      },
      {
          "text": "-20 €",
          "icon": "i10726" // i10726 (cross) if price is greater than goal - i59 (confirm) if price is lower than goal
      },
      {
          "text": "32 total entries",
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

/**
 *
 * @param {Array} result - The result provided by the ebay api
 * @param {Object} options - The request queries provided by the user
 */
const handleResult = (result, options) => {
  // Create chart
  const chartData = [];
  for (let i = 0; i < result[0].searchResult[0].item.length; i += 1) {
    const item = result[0].searchResult[0].item[i];
    chartData.push(item.sellingStatus[0].currentPrice[0].__value__);
  }
  // end:: Create chart
  const laMetricFrames = {
    frames: [
      {
        text: options.title,
        icon: 'a15297',
      },
      {
        text: `${result[0].searchResult[0].item[0].sellingStatus[0].currentPrice[0].__value__} ${result[0].searchResult[0].item[0].sellingStatus[0].currentPrice[0]['@currencyId']}`,
        icon: 'i635',
      },
      {
        text: `${result[0].paginationOutput[0].totalEntries[0]} entries found`,
        icon: null,
      },
      {
        index: 3,
        chartData,
      },
    ],
  };
  // add goal to frame if provided by user
  if (options.goal) {
    laMetricFrames.frames.splice(2, 0, {
      text: `${
        Number.parseFloat(options.goal) -
        Number.parseFloat(result[0].searchResult[0].item[0].sellingStatus[0].currentPrice[0].__value__)
      } ${result[0].searchResult[0].item[0].sellingStatus[0].currentPrice[0]['@currencyId']}`,
      icon:
        Number.parseInt(options.goal, 10) - result[0].searchResult[0].item[0].sellingStatus[0].currentPrice[0].__value__ < 0
          ? 'i10726'
          : 'i59',
    });
    laMetricFrames.frames[4].index = 4;
  }
  return laMetricFrames;
};

/**
 *
 * @param {Object} - The request queries provided by the user
 */
const getBestPriceForProduct = async (options) => {
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
  // byKeyword mode
  if (options.mode === 'byKeyword') {
    const results = getBestPriceForProductClient.findItemsByKeywords({
      keywords: options.payload,
      sortOrder: 'PricePlusShippingLowest', // https://developer.ebay.com/devzone/finding/callref/extra/fndcmpltditms.rqst.srtordr.html
    });
    const r = await results;
    return handleResult(r, options);
  }
  // byProduct mode
  if (options.mode === 'byProduct') {
    const results = getBestPriceForProductClient.findItemsByProduct({
      productId: Number.parseInt(options.payload, 10),
      sortOrder: 'PricePlusShippingLowest', // https://developer.ebay.com/devzone/finding/callref/extra/fndcmpltditms.rqst.srtordr.html
    });
    const r = await results;
    return handleResult(r, options);
  }
};

module.exports = {
  getBestPriceForProduct,
};
