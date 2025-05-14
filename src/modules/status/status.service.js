const { Status, Reporte } = require('../../models');
const { createNotification } = require('../../services/notification');

class StatusService {
    async listStatus() {
        const status = await Status.findAll({
            attributes: ['statusReporte']
        });

        if (!status) {
            const error = new Error('Status não encontrados');
            error.status = 404;
            throw error;
        }

        return status.map(item => item.statusReporte);
    }

    async updateStatusReporte(reporteId, newStatus) {
        if (!reporteId || isNaN(reporteId)) {
            const error = new Error('ID do reporte inválido ou não fornecido');
            error.status = 400;
            throw error;
        }

        const reporte = await Reporte.findByPk(reporteId);
        if (!reporte) {
            const error = new Error('Reporte não encontrado');
            error.status = 404;
            throw error;
        }

        // Validar status
        const validStatuses = await this.getValidStatuses();
        if (!validStatuses.includes(newStatus)) {
            const error = new Error(`Status "${newStatus}" inválido. Válidos: ${validStatuses.join(', ')}`);
            error.status = 400;
            throw error;
        }

        // Atualizar status
        reporte.statusReporte = newStatus;
        await reporte.save();

        // Criar notificação
        await createNotification({
            userId: reporte.userId,
            reporteId: reporte.id,
            newStatus
        });

        return reporte;
    }

    async getValidStatuses() {
        const statusList = await Status.findAll({ 
            attributes: ['statusReporte'] 
        });
        return statusList.map(item => item.statusReporte);
    }
}

module.exports = StatusService;