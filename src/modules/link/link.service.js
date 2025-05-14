const jwt = require('jsonwebtoken');
const { LinkCompartilhado, Reporte } = require('../../models');

class LinkService {
    async gerarLinkCompartilhado(reporteId) {
        if (!reporteId) {
            const error = new Error('ID do reporte não fornecido');
            error.status = 400;
            throw error;
        }

        // Gerar token único para o link
        const token = jwt.sign(
            { reporteId },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Criar registro do link no banco
        const link = await LinkCompartilhado.create({
            token,
            reporteId,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 horas
        });

        return link;
    }

    async acessarLink(token) {
        if (!token) {
            const error = new Error('Token não fornecido');
            error.status = 400;
            throw error;
        }

        // Verificar se o link existe e não expirou
        const link = await LinkCompartilhado.findOne({
            where: { token }
        });

        if (!link) {
            const error = new Error('Link inválido ou expirado');
            error.status = 404;
            throw error;
        }

        if (new Date() > link.expiresAt) {
            const error = new Error('Link expiradoLink');
            error.status = 400;
            throw error;
        }

        // Buscar o reporte associado
        const reporte = await Reporte.findByPk(link.reporteId);
        if (!reporte) {
            const error = new Error('Reporte não encontrado');
            error.status = 404;
            throw error;
        }

        return reporte;
    }
}

module.exports = LinkService;