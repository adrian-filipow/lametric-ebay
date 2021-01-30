const Joi = require('joi');

const getPrivates = {
  query: Joi.object().keys({
    mode: Joi.string().required().valid('keyword', 'auction'),
    keywords: Joi.string().min(2).max(300),
  }),
};

module.exports = {
  getPrivates,
};
