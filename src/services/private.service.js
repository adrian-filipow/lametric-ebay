const { getBestPriceForProduct } = require('../ebay/apps/bestPriceForProduct');

/**
 * Use ebay api client
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
const getBestPriceForProductService = async (options) => {
  const result = await getBestPriceForProduct(options);
  return result;
};

module.exports = {
  getBestPriceForProductService,
};
