const { Notification } = require('../../models');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../../services/authService');

exports.getNotificationByUser = async (req, res) => {
    try {
        const decoded = verifyToken(req);

        const userId = decoded.id;

        // Buscar notificações do usuário
        const notifications = await Notification.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            message: 'Notificações listadas com sucesso',
            data: notifications
        });
    } catch (error) {
        console.error('Erro ao listar notificações: ', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' })
    }
}

exports.deleteNotificationById = async (req, res) => {
    try {
        const decoded = verifyToken(req);

        const userId = decoded.id;

        const { notificationId } = req.params;

        // Deletar notificação do usuário
        await Notification.destroy({
            where: { id: notificationId, userId }
        });

        res.status(200).json({
            message: 'Notificação deletada com sucesso'
        });
    } catch (error) {
        console.error('Erro ao deletar notificação: ', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' })
    }
}

exports.deleteAllNotifications = async (req, res) => {
    try {
        const decoded = verifyToken(req);

        const userId = decoded.id;

        // Deletar todas as notificações do usuário
        await Notification.destroy({
            where: { userId }
        });

        res.status(200).json({
            message: 'Todas as notificações foram deletadas com sucesso'
        });
    } catch (error) {
        console.error('Erro ao deletar notificações: ', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' })
    }
}