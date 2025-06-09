const { Reporte, Categoria, Status, InteracoesReporte, ComentarioReporte } = require('../../models');
const { moderarTexto } = require('../../services/aiService');
const { Sequelize } = require('sequelize');
const { sequelize } = require('../../models');
const path = require('path');

class ReporteService {
    corrigirCaminhoImagem(caminho, tipo) {
        if (!caminho) return null;
        if (caminho.startsWith(tipo + '/')) return caminho;
        if (caminho.includes(tipo)) return tipo + '/' + path.basename(caminho);
        return caminho;
    }

    async createReporte(reporteData) {
        const { 
            descricaoReporte, 
            localizacaoReporte, 
            categoriasReporte, 
            imagem,
            userId,
            userData
        } = reporteData;

        if (!imagem) {
            const error = new Error('Imagem do reporte é obrigatória.');
            error.status = 400;
            throw error;
        }

        // Validar categoria
        const categoriaExistente = await Categoria.findOne({
            where: { categoriasReporte }
        });
        if (!categoriaExistente) {
            const error = new Error('Categoria não encontrada.');
            error.status = 400;
            throw error;
        }

        // Validar status
        const statusExistente = await Status.findOne({
            where: { statusReporte: 'Pendente' }
        });
        if (!statusExistente) {
            const error = new Error('Status não encontrado.');
            error.status = 400;
            throw error;
        }

        // Moderar texto
        const resultadoModeracao = await moderarTexto(descricaoReporte);
        if (resultadoModeracao?.flagged) {
            const error = new Error('Texto inapropriado detectado.');
            error.status = 400;
            throw error;
        }

        return await Reporte.create({
            fotoPerfil: userData.fotoPerfil,
            nomePerfil: userData.nome,
            horarioReporte: new Date(),
            localizacaoReporte,
            descricaoReporte,
            imagemReporte: imagem.path,
            avaliacaoReporte: null,
            categoriaReporte: categoriasReporte,
            statusReporte: 'Pendentew',
            userId
        });
    }

    async getReportesWithInteractions() {
        return await Reporte.findAll({
            include: [
                {
                    model: InteracoesReporte,
                    attributes: ['tipo', 'userId']
                },
                {
                    model: ComentarioReporte,
                    attributes: ['comentario', 'userId']
                }
            ]
        });
    }

    async getReportesByUser(userId) {
        let reportes = await Reporte.findAll({ where: { userId } });

        return reportes.map(reporte => ({
            id: reporte.id,
            descricao: reporte.descricaoReporte,
            fotoPerfil: this.corrigirCaminhoImagem(reporte.fotoPerfil, 'fotosPerfil'),
            imagemReporte: this.corrigirCaminhoImagem(reporte.imagemReporte, 'uploads'),
            nomePerfil: reporte.nomePerfil,
            horarioReporte: reporte.horarioReporte,
            localizacaoReporte: reporte.localizacaoReporte,
            categoriasReporte: reporte.categoriaReporte,
            statusReporte: reporte.statusReporte,
            avaliacaoReporte: reporte.avaliacaoReporte
        }));
    }

    async avaliarReporte(idReporte, avaliacao) {
        if (!idReporte || typeof idReporte !== 'number') {
            const error = new Error('ID do reporte inválido ou não fornecido.');
            error.status = 400;
            throw error;
        }

        if (avaliacao === undefined || typeof avaliacao !== 'number' || avaliacao < 0 || avaliacao > 5) {
            const error = new Error('Avaliação inválida. Deve ser um número entre 0 e 5.');
            error.status = 400;
            throw error;
        }

        const reporte = await Reporte.findByPk(idReporte);
        if (!reporte) {
            const error = new Error('Reporte não encontrado.');
            error.status = 404;
            throw error;
        }

        reporte.avaliacaoReporte = avaliacao;
        await reporte.save();

        return reporte;
    }

    async interagirComReporte(userId, reporteId, tipo) {
        if (!['like', 'dislike'].includes(tipo)) {
            const error = new Error('Tipo inválido.');
            error.status = 400;
            throw error;
        }

        const existing = await InteracoesReporte.findOne({
            where: { userId, reporteId }
        });

        let responseMessage = '';
        let interacao = null;

        if (!existing) {
            interacao = await InteracoesReporte.create({ userId, reporteId, tipo });
            responseMessage = `Interação '${tipo}' criada com sucesso.`;
        } else if (existing.tipo === tipo) {
            await existing.destroy();
            responseMessage = `Interação '${tipo}' removida com sucesso.`;
        } else {
            await existing.update({ tipo });
            interacao = existing;
            responseMessage = `Interação atualizada de '${existing.tipo}' para '${tipo}'.`;
        }

        return {
            message: responseMessage,
            data: interacao
        };
    }

    async comentarReporte(userId, reporteId, comentario) {
        return await ComentarioReporte.create({
            comentario,
            userId,
            reporteId
        });
    }

    async getTopReportesByIDH(limit = 10) {
        // Supondo que o modelo Reporte tenha um campo 'impactoIDH'
        return await Reporte.findAll({
            order: [['impactoIDH', 'DESC']],
            limit,
        include: [
            { model: InteracoesReporte, attributes: ['tipo', 'userId'] },
            { model: ComentarioReporte, attributes: ['comentario', 'userId'] }
            ]
        });
    }

    async getTopColaboradores(limit = 3) {
        const [results] = await sequelize.query(`
            SELECT 
                u.id,
                u.nome,
                u.email,
                COUNT(r.id) as "totalReportes"
            FROM users u
            LEFT JOIN reporte r ON r."userId" = u.id
            GROUP BY u.id, u.nome, u.email
            ORDER BY COUNT(r.id) DESC
            LIMIT :limit
        `, {
            replacements: { limit },
            type: sequelize.QueryTypes.SELECT
        });
    
        return results;
    }
}

module.exports = ReporteService;