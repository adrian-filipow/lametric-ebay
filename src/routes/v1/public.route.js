const express = require('express');
const validate = require('../../middlewares/validate');
const privateValidation = require('../../validations/private.validation');
const privateController = require('../../controllers/private.controller');

const router = express.Router();

router
  .route('/bestPriceForProduct')
  .get(validate(privateValidation.getBestPriceForProduct), privateController.getBestPriceForProduct);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: bestPriceForProduct
 *   description: Observe prices of your favourite products.
 */

/**
 * @swagger
 * path:
 *  /private:
 *    get:
 *      summary: Query products or get a single product by the products ePID
 *      description: Only logged in users can use that route. The rate limit is set to 20 requests per windowMs with a window of 60 seconds per IP-Address.
 *      tags: [Users]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: mode
 *          schema:
 *            type: string
 *          description: Required. Valid values are byKeyword or byProduct.
 *        - in: query
 *          name: market
 *          schema:
 *            type: string
 *          description: required (e.g. EBAY-DE or EBAY-US)
 *        - in: query
 *          name: payload
 *          schema:
 *            type: string
 *          description: A search string between 2 - 300 characters if mode is set to byKeyword. Else use a valid ePID of the product.
 *        - in: query
 *          name: title
 *          schema:
 *            type: string
 *        - in: query
 *          name: goal
 *          schema:
 *            type: string
 *          description: A price goal for the product. e.g. 200 (the default currency of your market will be used)
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/User'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 */
