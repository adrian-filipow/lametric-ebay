const Joi = require('joi');

const { globalIdList } = require('../ebay/data/globalIdList');

const getBestPriceForProduct = {
  query: Joi.object().keys({
    mode: Joi.string().required().valid('byKeyword', 'byProduct'),
    market: Joi.string()
      .required()
      .valid(...globalIdList),
    payload: Joi.string().required().min(2).max(300),
    title: Joi.string().required().min(2).max(50),
    goal: Joi.string().min(1).max(20),
  }),
};

module.exports = {
  getBestPriceForProduct,
};
