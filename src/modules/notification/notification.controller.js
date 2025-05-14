class NotificationController {
    constructor(notificationService, errorHandler) {
        this.notificationService = notificationService;
        this.errorHandler = errorHandler;
    }

    async getNotificationByUser(req, res) {
        try {
            const userId = req.user.id; // req.user já preenchido pelo middleware
            const notifications = await this.notificationService.getNotificationsByUser(userId);
            return res.status(200).json({
                message: 'Notificações listadas com sucesso',
                data: notifications
            });
        } catch (error) {
            return this.errorHandler.handleError(error, res, 'Erro ao listar notificações');
        }
    }

    async deleteNotificationById(req, res) {
        try {
            const userId = req.user.id;
            const { notificationId } = req.params;
            await this.notificationService.deleteNotificationById(notificationId, userId);
            return res.status(200).json({
                message: 'Notificação deletada com sucesso'
            });
        } catch (error) {
            return this.errorHandler.handleError(error, res, 'Erro ao deletar notificação');
        }
    }

    async deleteAllNotifications(req, res) {
        try {
            const userId = req.user.id;
            await this.notificationService.deleteAllNotifications(userId);
            return res.status(200).json({
                message: 'Todas as notificações foram deletadas com sucesso'
            });
        } catch (error) {
            return this.errorHandler.handleError(error, res, 'Erro ao deletar notificações');
        }
    }
}

module.exports = NotificationController;