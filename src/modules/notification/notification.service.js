const { Notification } = require('../../models');

class NotificationService {
    async getNotificationsByUser(userId) {
        return await Notification.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']]
        });
    }

    async deleteNotificationById(notificationId, userId) {
        if (!notificationId) {
            const error = new Error('ID da notificação não fornecido');
            error.status = 400;
            throw error;
        }
        await Notification.destroy({
            where: { id: notificationId, userId }
        });
    }

    async deleteAllNotifications(userId) {
        await Notification.destroy({
            where: { userId }
        });
    }
}

module.exports = NotificationService;