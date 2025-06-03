const express = require('express')
const router = express.Router()
const categoriaController = require('./categoria.controller')
const { authorizeRoles } = require('../../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Categoria
 *   description: Rotas de criação e visualização de categorias
 */

/**
 * @swagger
 * /api/categoria/create:
 *   post:
 *     tags:
 *       - Categoria
 *     summary: Cria uma nova categoria
 *     description: Cria uma nova categoria de reporte, apenas se o usuário for admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoriasReporte
 *             properties:
 *               categoriasReporte:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *       403:
 *         description: Usuário não é admin
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/create', authorizeRoles('admin'), categoriaController.createCategoria);

/**
 * @swagger
 * /api/categoria/get:
 *   get:
 *     tags:
 *       - Categoria
 *     summary: Retorna categorias
 *     description: Retorna todos as categorias de reporte disponíveis
 *     responses:
 *       200:
 *         description: Categorias disponíveis
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/get', authorizeRoles('admin'), categoriaController.listCategorias);

/**
 * @swagger
 * /api/categoria/{id}:
 *   delete:
 *     tags:
 *       - Categoria
 *     summary: Deleta uma categoria
 *     description: Deleta uma categoria existente. Apenas usuários com papel de administrador (admin) têm permissão para deletar.
 *     parameters:
 *       - name: id
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoria deletada com sucesso
 *       400:
 *         description: ID da categoria não fornecido
 *       401:
 *         description: Token não fornecido ou inválido
 *       403:
 *         description: Acesso negado. Somente administradores podem deletar categorias
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', authorizeRoles('admin'), categoriaController.deleteCategoria);

module.exports = router;