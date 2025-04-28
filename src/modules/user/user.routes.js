const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const { authorizeRoles } = require('../../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Rotas de usuário
 */

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     tags:
 *       - User
 *     summary: Perfil do usuário
 *     description: Retorna as informações do perfil do usuário.
 *     responses:
 *       200:
 *         description: Dados do perfil do usuário.
 */
router.get('/profile', authorizeRoles('admin', 'externo', 'user'), userController.getProfile);

/**
 * @swagger
 * /api/user/update:
 *   put:
 *     tags:
 *       - User
 *     summary: Atualizar perfil do usuário
 *     description: Atualiza as informações do perfil do usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               birthdate:
 *                 type: string
 *               cep: 
 *                  type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso!
 *       400:
 *         description: Dados inválidos.
 */
router.put('/update', authorizeRoles('admin', 'externo', 'user'), userController.updateProfile);

/**
 * @swagger
 * /api/user/delete:
 *   delete:
 *     tags:
 *       - User
 *     summary: Deleta o usuário logado
 *     description: Deleta o usuário logado no sistema.
 *     responses:
 *       200:
 *         description: Mensagem de sucesso ao deletar o usuário
 *       404:
 *         description: Mensagem de erro. Usuário não encontrado para deletar
 */
router.delete('/delete', authorizeRoles('admin', 'externo', 'user'), userController.deleteProfile);

/**
 * @swagger
 * /api/user/forgot-password:
 *   post:
 *     tags:
 *       - User
 *     summary: Solicitar redefinição de senha
 *     description: Envia um link de redefinição de senha para o e-mail do usuário, com validade de 15 minutos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@email.com
 *                 description: E-mail cadastrado do usuário.
 *     responses:
 *       200:
 *         description: Link de redefinição enviado para o e-mail.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro ao enviar e-mail.
 */

router.post('/forgot-password', userController.forgotPassword);

/**
 * @swagger
 * /api/user/reset-password:
 *   post:
 *     tags:
 *       - User
 *     summary: Redefinir senha do usuário
 *     description: Redefine a senha do usuário a partir de um token de recuperação de senha.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token JWT enviado por e-mail.
 *               newPassword:
 *                 type: string
 *                 description: Nova senha.
 *               confirmPassword:
 *                 type: string
 *                 description: Confirmação da nova senha.
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso.
 *       400:
 *         description: Token inválido, expirado ou senhas não coincidem.
 */
router.post('/reset-password', userController.resetPassword);

module.exports = router;
