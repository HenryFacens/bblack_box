const express = require('express');
const router = express.Router();
const healthController = require('./health.controller');
const { authorizeRoles } = require('../../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Base
 *   description: Rotas base para verficação de status da API
 */

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Base
 *     summary: Status da API
 *     description: Retorna se a API está ativa ou não.
 *     responses:
 *       200:
 *         description: Mensagem de sucesso
 *       400:
 *         description: Mensagem de erro ao acessar a API
 */
router.get('/', authorizeRoles('admin', 'externo', 'user'), healthController.health);

module.exports = router;
