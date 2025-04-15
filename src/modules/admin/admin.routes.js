const express = require('express')
const router = express.Router()
const adminController = require('./admin.controller')
const { authorizeRoles } = require('../../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Rotas para painel de admin
 */

/**
 * @swagger
 * /api/admin/get:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Usuários do app
 *     description: Retorna todos os usuários do app
 *     responses:
 *       200:
 *         description: Usuários cadastrados
 *       401:
 *         description: Token não fornecido ou inválido
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/get', authorizeRoles('admin'), adminController.listUsers);

/**
 * @swagger
 * /api/admin/update/{userId}/role:
 *   patch:
 *     tags:
 *       - Admin
 *     summary: Atualiza a role de um usuário
 *     description: Atualiza a role de um usuário
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newRole:
 *                 type: string
 *     responses:
 *       200:
 *         description: Role do usuário atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token não fornecido ou inválido
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.patch('/update/:userId/role', authorizeRoles('admin'), adminController.updateUserRole);

/**
 * @swagger
 * /api/admin/ban:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Banir um usuário
 *     description: Bane um usuário existente e salva o registro de banimento com as informações fornecidas. Se o motivo do banimento for "post" ou "comentario", o parâmetro reporteId se torna obrigatório.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UserNameBanned:
 *                 type: string
 *               reason:
 *                 type: string
 *                 enum: [post, comentario, outros]
 *               reporteId:
 *                 type: integer
 *             required:
 *               - UserNameBanned
 *               - reason
 *     responses:
 *       200:
 *         description: Usuário banido com sucesso e registro salvo.
 *       400:
 *         description: Dados inválidos ou falta de parâmetros obrigatórios.
 *       401:
 *         description: Token não fornecido ou inválido.
 *       403:
 *         description: Ação não permitida.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post('/ban', authorizeRoles('admin'), adminController.banUser)

/**
 * @swagger
 * /api/admin/delete:
 *   delete:
 *     tags:
 *       - Admin
 *     summary: Deleta um usuário pelo nome
 *     description: Deleta um usuário existente pelo nome fornecido no corpo da requisição.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userNameToBeDeleted:
 *                 type: string
 *               motivo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       401:
 *         description: Token não fornecido ou inválido
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/delete', authorizeRoles('admin'), adminController.deleteUser);



module.exports = router;