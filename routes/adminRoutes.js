const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.use(authMiddleware); // Authentication required

/**
 * @swagger
 * servers:
 *   - url: http://localhost:5000
 *     description: Local development server
 */
/**
 * @swagger
 * /admin/manage-users:
 *   get:
 *     summary: Retrieve all users
 *     description: Fetches a list of all users for administrative management.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Server error
 */
router.get('/manage-users', roleMiddleware(['admin']), adminController.manageUsers);

/**
 * @swagger
 * /admin/update-user/{userId}:
 *   patch:
 *     summary: Update a user's information
 *     description: Allows an administrator to update user details.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to update
 *     requestBody:
 *       description: Updated user information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       500:
 *         description: Server error
 */
router.patch('/update-user/:userId', roleMiddleware(['admin']), adminController.updateUser);

/**
 * @swagger
 * /admin/deactivate-user/{userId}:
 *   delete:
 *     summary: Deactivate a user
 *     description: Deactivates a specified user account.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to deactivate
 *     responses:
 *       200:
 *         description: User deactivated successfully
 *       500:
 *         description: Server error
 */
router.delete('/deactivate-user/:userId', roleMiddleware(['admin']), adminController.deactivateUser);

/**
 * @swagger
 * /admin/view-orders:
 *   get:
 *     summary: View all orders
 *     description: Retrieves a list of all orders.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
 */
router.get('/view-orders', roleMiddleware(['admin']), adminController.viewAllOrders);

/**
 * @swagger
 * /admin/manage-order/{orderId}:
 *   patch:
 *     summary: Manage an order
 *     description: Updates details of a specific order.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order to update
 *     requestBody:
 *       description: Updated order details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Order managed successfully
 *       500:
 *         description: Server error
 */
router.patch('/manage-order/:orderId', roleMiddleware(['admin']), adminController.manageOrder);

/**
 * @swagger
 * /admin/generate-reports:
 *   get:
 *     summary: Generate reports
 *     description: Generates various reports for admin purposes.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Report generated successfully
 *       500:
 *         description: Server error
 */
router.get('/generate-reports', roleMiddleware(['admin']), adminController.generateReports);

/**
 * @swagger
 * /admin/monitor-activity:
 *   get:
 *     summary: Monitor platform activity
 *     description: Monitors platform activity for administrative oversight.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Platform activity monitored successfully
 *       500:
 *         description: Server error
 */
router.get('/monitor-activity', roleMiddleware(['admin']), adminController.monitorPlatformActivity);

module.exports = router;