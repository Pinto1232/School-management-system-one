const express = require('express');
const { getSidebarNavigation } = require('../controllers/navigation');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     SidebarNavigationLink:
 *       type: object
 *       required: [id, key, label, path, icon, roles, parent_id, position, enabled, target]
 *       properties:
 *         id:
 *           type: integer
 *           minimum: 1
 *         key:
 *           type: string
 *           example: attendance
 *         label:
 *           type: string
 *           example: Presenças
 *         path:
 *           type: string
 *           example: /dashboard/attendance
 *         icon:
 *           type: string
 *           example: ph:check-square
 *         roles:
 *           type: array
 *           items:
 *             type: string
 *         parent_id:
 *           type: integer
 *           nullable: true
 *         position:
 *           type: integer
 *           minimum: 0
 *         enabled:
 *           type: boolean
 *         target:
 *           type: string
 *           enum: [_self, _blank]
 *     SidebarNavigationResponse:
 *       type: object
 *       required: [data, meta]
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SidebarNavigationLink'
 *         meta:
 *           type: object
 *           required: [total, role, tree, include_disabled]
 *           properties:
 *             total:
 *               type: integer
 *             role:
 *               type: string
 *               nullable: true
 *             tree:
 *               type: boolean
 *             include_disabled:
 *               type: boolean
 *     ApiError:
 *       type: object
 *       required: [message]
 *       properties:
 *         message:
 *           type: string
 *         code:
 *           type: string
 * /api/v1/navigation/sidebar:
 *   get:
 *     summary: Return the authenticated user's sidebar navigation
 *     tags: [Navigation]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Role-filtered sidebar navigation ordered by position
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SidebarNavigationResponse'
 *       401:
 *         description: Missing, invalid, or expired access token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       403:
 *         description: The authenticated identity is not allowed to access this school
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       500:
 *         description: The API or identity provider is not configured correctly
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
router.get('/sidebar', getSidebarNavigation);

module.exports = router;
