const express = require('express')
const router = express.Router()
const reporteController = require('./reporte.controller')
const upload = require('../../middleware/upload')
const { authorizeRoles } = require('../../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Reporte
 *   description: Rotas de criação e visualização de reportes
 */

/**
 * @swagger
 * /api/reporte/create:
 *   post:
 *     tags:
 *       - Reporte
 *     summary: Criar um novo reporte
 *     description: Cria um novo reporte com uma descrição e uma imagem
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - descricaoReporte
 *               - imagemReporte
 *               - localizacaoReporte
 *               - categoriasReporte
 *               - statusReporte
 *             properties:
 *               descricaoReporte:
 *                 type: string
 *               localizacaoReporte:
 *                 type: string
 *               imagemReporte:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               categoriasReporte:
 *                 type: string
 *               statusReporte:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reporte criado com sucesso
 *       400:
 *         description: Requisição inválida (dados obrigatórios ausentes)
 *       401:
 *         description: Token JWT ausente ou inválido
 *       500:
 *         description: Erro interno do servidor
 */

router.post(
    '/create', 
    upload.fields([{ name: 'imagemReporte', maxCount: 1 }]),
    authorizeRoles('admin', 'user'),
    reporteController.createReporte
);

/**
 * @swagger
 * /api/reporte/get:
 *   get:
 *     tags:
 *       - Reporte
 *     summary: Retorna reportes
 *     description: Retorna todos os reportes criados
 *     responses:
 *       200:
 *         description: Reportes criados
 */
router.get('/get', authorizeRoles('admin', 'externo', 'user'), reporteController.getReportes);

/**
 * @swagger
 * /api/reporte/me:
 *   get:
 *     tags:
 *       - Reporte
 *     summary: Retorna reportes do usuário logado
 *     description: Retorna todos os reportes criados pelo usuário autenticado
 *     responses:
 *       200:
 *         description: Reportes do usuário logado
 */
router.get('/me', authorizeRoles('admin', 'externo', 'user'), reporteController.getMyReportes);

/**
 * @swagger
 * /api/reporte/update:
 *   put:
 *     tags:
 *       - Reporte
 *     summary: Atualizar avaliação do reporte
 *     description: Atualiza a avaliação do reporte postado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idReporte:
 *                 type: integer
 *               avaliacao:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso!
 *       400:
 *         description: Dados inválidos.
 */
router.put('/update', authorizeRoles('admin', 'user'), reporteController.avaliacaoReporte);

/**
 * @swagger
 * /api/reporte/{reporteId}/interagir:
 *   post:
 *     tags:
 *       - Reporte
 *     summary: Interagir com um reporte
 *     description: Permite que um usuário dê like ou dislike em um reporte. Um usuário só pode interagir uma vez por reporte, mas pode atualizar sua interação.
 *     parameters:
 *       - name: reporteId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tipo
 *             properties:
 *               tipo:
 *                 type: string
 *                 enum: [like, dislike]
 *     responses:
 *       200:
 *         description: Interação criada ou atualizada com sucesso
 *       400:
 *         description: Tipo de interação inválido
 *       401:
 *         description: Token JWT ausente ou inválido
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/:reporteId/interagir', authorizeRoles('admin', 'user'), reporteController.interagirReporte);

/**
 * @swagger
 * /api/reporte/{reporteId}/comentario:
 *   post:
 *     tags:
 *       - Reporte
 *     summary: Criar comentário
 *     description: Permite que um usuário  comente em um reporte. Um usuário só pode comentar uma vez por reporte.
 *     parameters:
 *       - name: reporteId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comentario
 *             properties:
 *               comentario:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comentário criado ou atualizado com sucesso
 *       401:
 *         description: Token JWT ausente ou inválido
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/:reporteId/comentario', authorizeRoles('admin', 'user'), reporteController.comentarioReporte);

module.exports = router;