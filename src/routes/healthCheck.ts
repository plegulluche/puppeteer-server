import express from 'express';

const router = express.Router();

/**
 * @openapi
 * /test-route:
 *   get:
 *     summary: Test endpoint
 *     description: Returns a simple message to confirm that the route is working.
 *     responses:
 *       200:
 *         description: Route is working correctly.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: route ok
 */
router.get('/test-route', (req, res) => {
  res.status(200).send({ message: 'route ok' });
});

export default router;
