const Joi = require('joi');

const { globalIdList } = require('../ebay/data/globalIdList');

const getBestPriceForProduct = {
  query: Joi.object().keys({
    market: Joi.string()
      .required()
      .valid(...globalIdList),
    keywords: Joi.string().required().min(2).max(300),
  }),
};

module.exports = {
  getBestPriceForProduct,
};
