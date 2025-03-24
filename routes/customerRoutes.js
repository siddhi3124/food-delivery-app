const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const customerController = require('../controllers/customerController');

const router = express.Router();

// Use authentication middleware for all routes
router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Customer
 *   description: Endpoints for customer actions
 */
/**
 * @swagger
 * servers:
 *   - url: http://localhost:5000
 *     description: Local development server
 */

/**
 * @swagger
 * /customer/browse-restaurants:
 *   get:
 *     summary: Browse available restaurants
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all available restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/browse-restaurants', roleMiddleware(['customer']), customerController.browseRestaurants);

/**
 * @swagger
 * /customer/search-menus:
 *   get:
 *     summary: Search for menu items in restaurants
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: The search query for menu items
 *     responses:
 *       200:
 *         description: List of menu items matching the query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MenuItem'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/search-menus', roleMiddleware(['customer']), customerController.searchMenus);

/**
 * @swagger
 * /customer/place-order:
 *   post:
 *     summary: Place a new order
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     menuItemId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *               restaurantId:
 *                 type: string
 *             required:
 *               - items
 *               - restaurantId
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/place-order', roleMiddleware(['customer']), customerController.placeOrder);

/**
 * @swagger
 * /customer/track-order/{orderId}:
 *   get:
 *     summary: Track a specific order
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to track
 *     responses:
 *       200:
 *         description: The details of the tracked order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.get('/track-order/:orderId', roleMiddleware(['customer']), customerController.trackOrder);

/**
 * @swagger
 * /customer/order-history:
 *   get:
 *     summary: Get the order history for the customer
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all past orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/order-history', roleMiddleware(['customer']), customerController.orderHistory);

module.exports = router;