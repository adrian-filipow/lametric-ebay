const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const privateValidation = require('../../validations/private.validation');
const privateController = require('../../controllers/private.controller');

const router = express.Router();

router
  .route('/bestPriceForProduct')
  .get(
    auth('usePrivateRoutes'),
    validate(privateValidation.getBestPriceForProduct),
    privateController.getBestPriceForProduct
  );

module.exports = router;
