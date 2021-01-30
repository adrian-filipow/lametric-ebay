const { ebayClient } = require('../config/ebay');

/**
 * Use ebay api client
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
const privateService = async (options) => {
  /**
   * MODE: KEYWORD
   */
  if (options.mode === 'keyword') {
    const results = await ebayClient.findItemsByKeywords({
      keywords: 'Fernseher',
      sortOrder: 'PricePlusShippingLowest', // https://developer.ebay.com/devzone/finding/callref/extra/fndcmpltditms.rqst.srtordr.html
    });
    return results;
  }
  /**
   * MODE: AUCTION
   */
  if (options.mode === 'auction') {
    return 'auction';
  }
};

module.exports = {
  privateService,
};
