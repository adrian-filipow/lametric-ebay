const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const privateValidation = require('../../validations/private.validation');
const privateController = require('../../controllers/private.controller');

const router = express.Router();

router.route('/').get(auth('usePrivateRoutes'), validate(privateValidation.getPrivates), privateController.getPrivates);

module.exports = router;
