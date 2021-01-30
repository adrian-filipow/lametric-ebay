const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { privateService } = require('../services/private.service');

const getPrivates = catchAsync(async (req, res) => {
  const options = pick(req.query, ['mode', 'keywords']);
  const result = await privateService(options);
  res.send(result);
});

module.exports = {
  getPrivates,
};
