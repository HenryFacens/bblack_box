const { Notification } = require('../../models');
const jwt = require('jsonwebtoken');

exports.getNotificationByUser = async (req, res) => {
    try {
        // Pegar token do cabeçalho da requisição
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }
        // Verificar e decodificar o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sua_chave_secreta');

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