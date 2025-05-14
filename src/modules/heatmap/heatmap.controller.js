class HeatmapController {
    constructor(heatmapService, errorHandler) {
        this.heatmapService = heatmapService;
        this.errorHandler = errorHandler;
    }

    async getReportesCoords(req, res) {
        try {
            const coords = await this.heatmapService.getReportesCoords();
            return res.status(200).json({ data: coords });
        } catch (error) {
            return this.errorHandler.handleError(error, res, 'Erro ao listar coordenadas dos reportes');
        }
    }
}

module.exports = HeatmapController;