const express = require('express');
const router = express.Router();
const linkController = require('./link.controller');
const { authorizeRoles } = require('../../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Link
 *   description: Rotas para link de compartilhamento de reporte
 */

/**
 * @swagger
 * /api/link/share/{reporteId}:
 *   post:
 *     tags:
 *       - Link
 *     summary: Gera um link único para compartilhar um reporte
 *     description: Gera um token que pode ser usado para acessar um reporte via link único.
 *     parameters:
 *       - in: path
 *         name: reporteId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do reporte a ser compartilhado
 *     responses:
 *       201:
 *         description: Link gerado com sucesso
 *       500:
 *         description: Erro ao gerar o link
 */
router.post('/share/:reporteId', authorizeRoles('admin', 'externo', 'user'), linkController.gerarLink);

/**
 * @swagger
 * /api/link/access/{token}:
 *   get:
 *     tags:
 *       - Link
 *     summary: Acessa um reporte via link único
 *     description: Permite visualizar os dados de um reporte usando um token de link compartilhado.
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token do link compartilhado
 *     responses:
 *       200:
 *         description: Reporte retornado com sucesso
 *       400:
 *         description: Link inválido, expirado ou já utilizado
 */
router.get('/access/:token', authorizeRoles('admin', 'externo', 'user'), linkController.acessarLink);

module.exports = router;