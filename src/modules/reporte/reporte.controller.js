class ReporteController {
    constructor(reporteService, errorHandler) {
        this.reporteService = reporteService;
        this.errorHandler = errorHandler;
    }

    async createReporte(req, res) {
        try {
            const userId = req.user.id;
            const userData = {
                nome: req.user.nome,
                fotoPerfil: req.user.fotoPerfil
            };
            
            const reporteData = {
                ...req.body,
                imagem: req.file,
                userId,
                userData
            };

            const novoReporte = await this.reporteService.createReporte(reporteData);
            
            return res.status(201).json({
                message: 'Reporte criado com sucesso',
                data: novoReporte
            });
        } catch (error) {
            return this.errorHandler.handleError(error, res, 'Erro ao criar reporte');
        }
    }

    async getReportes(req, res) {
        try {
            const reportes = await this.reporteService.getReportesWithInteractions();
            return res.status(200).json({ data: reportes });
        } catch (error) {
            return this.errorHandler.handleError(error, res, 'Erro ao listar reportes');
        }
    }

    async getMyReportes(req, res) {
        try {
            const userId = req.user.id;
            const reportes = await this.reporteService.getReportesByUser(userId);
            return res.status(200).json({ data: reportes });
        } catch (error) {
            return this.errorHandler.handleError(error, res, 'Erro ao listar reportes do usuário');
        }
    }

    async avaliacaoReporte(req, res) {
        try {
            const { idReporte, avaliacao } = req.body;
            const reporte = await this.reporteService.avaliarReporte(idReporte, avaliacao);
            return res.status(200).json({
                message: 'Avaliação atualizada com sucesso.',
                data: reporte
            });
        } catch (error) {
            return this.errorHandler.handleError(error, res, 'Erro ao avaliar reporte');
        }
    }

    async interagirReporte(req, res) {
        try {
            const userId = req.user.id;
            const { reporteId } = req.params;
            const { tipo } = req.body;

            const result = await this.reporteService.interagirComReporte(userId, reporteId, tipo);
            
            return res.status(200).json(result);
        } catch (error) {
            return this.errorHandler.handleError(error, res, 'Erro na interação');
        }
    }

    async comentarioReporte(req, res) {
        try {
            const userId = req.user.id;
            const { reporteId } = req.params;
            const { comentario } = req.body;

            const result = await this.reporteService.comentarReporte(userId, reporteId, comentario);
            
            return res.status(200).json({
                message: 'Comentário criado com sucesso',
                data: result
            });
        } catch (error) {
            return this.errorHandler.handleError(error, res, 'Erro na criação de comentário');
        }
    }

    async getTopReportesByIDH(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const reportes = await this.reporteService.getTopReportesByIDH(limit);
            return res.status(200).json({ data: reportes });
      } catch (error) {
            return this.errorHandler.handleError(error, res, 'Erro ao buscar reportes de maior impacto no IDH');
      }
    }

    async getTopColaboradores(req, res) {
          try {
            const limit = parseInt(req.query.limit) || 3;
            const colaboradores = await this.reporteService.getTopColaboradores(limit);
            return res.status(200).json({ data: colaboradores });
          } catch (error) {
            return this.errorHandler.handleError(error, res, 'Erro ao buscar colaboradores');
          }
        }
}

module.exports = ReporteController;