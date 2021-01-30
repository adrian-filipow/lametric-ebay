const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { getBestPriceForProductService } = require('../services/private.service');

const getBestPriceForProduct = catchAsync(async (req, res) => {
  const options = pick(req.query, ['market', 'keywords']);
  const result = await getBestPriceForProductService(options);
  res.send(result);
});

module.exports = {
  getBestPriceForProduct,
};
