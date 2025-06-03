const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const { authorizeRoles } = require('../../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Rotas de autenticação
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Cadastro de usuário
 *     description: Cria uma nova conta de usuário.
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
 *               cpf:
 *                 type: string
 *               birthdate:
 *                 type: string
 *               cep: 
 *                  type: string
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso.
 *       400:
 *         description: Email já cadastrado ou dados inválidos.
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login de usuário
 *     description: Autentica o usuário e retorna um token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token JWT gerado com sucesso.
 *       400:
 *         description: Credenciais inválidas.
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Logout do usuário
 *     description: Realiza o logout do usuário logado no sistema
 *     responses:
 *       200:
 *         description: Mensagem de sucesso ao realizar o logout
 *       500:
 *         description: Mensagem de erro ao tentar realizar o logout
 */
router.post('/logout', authorizeRoles('admin', 'externo', 'user'), authController.logout);

module.exports = router;
