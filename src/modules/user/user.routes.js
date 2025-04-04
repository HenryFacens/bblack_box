const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Perfil do usuário
 *     description: Retorna as informações do perfil do usuário.
 *     responses:
 *       200:
 *         description: Dados do perfil do usuário.
 */
router.get('/profile', userController.getProfile);

/**
 * @swagger
 * /api/user/update:
 *   put:
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
router.put('/update', userController.updateProfile);

module.exports = router;
