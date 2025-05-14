class StatusController {
    constructor(statusService, errorHandler) {
        this.statusService = statusService;
        this.errorHandler = errorHandler;
    }

    async listStatus(req, res) {
        try {
            const statusList = await this.statusService.listStatus();
            return res.status(200).json({
                data: statusList
            });
        } catch (error) {
            return this.errorHandler.handleError(error, res, 'Erro ao listar status');
        }
    }

    async updateStatusReporte(req, res) {
        try {
            const { reporteId } = req.params;
            const { newStatus } = req.body;
            
            const reporte = await this.statusService.updateStatusReporte(reporteId, newStatus);
            
            return res.status(200).json({
                message: 'Status atualizado com sucesso.',
                data: reporte
            });
        } catch (error) {
            return this.errorHandler.handleError(error, res, 'Erro ao atualizar status do reporte');
        }
    }
}

module.exports = StatusController;