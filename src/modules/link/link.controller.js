class LinkController {
    constructor(linkService, errorHandler) {
        this.linkService = linkService;
        this.errorHandler = errorHandler;
    }

    async gerarLink(req, res) {
        try {
            const { reporteId } = req.params;
            const link = await this.linkService.gerarLinkCompartilhado(reporteId);
            
            return res.status(201).json({ 
                token: link.token, 
                url: `/compartilhamento/acessar/${link.token}` 
            });
        } catch (error) {
            return this.errorHandler.handleError(error, res, 'Erro ao gerar link de compartilhamento');
        }
    }

    async acessarLink(req, res) {
        try {
            const { token } = req.params;
            const reporte = await this.linkService.acessarLink(token);
            return res.status(200).json(reporte);
        } catch (error) {
            return this.errorHandler.handleError(error, res, 'Erro ao acessar link de compartilhamento');
        }
    }
}

module.exports = LinkController;