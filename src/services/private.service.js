/**
 * Use ebay api client
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
const queryPrivates = async (options) => {
  /** MODE: KEYWORD */
  if (options.mode === 'keyword') {
    return 'keyword';
  }
  /** MODE: AUCTION */
  if (options.mode === 'auction') {
    return 'auction';
  }
};

module.exports = {
  queryPrivates,
};
