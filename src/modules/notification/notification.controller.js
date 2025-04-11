const { Notification } = require('../../models');
const jwt = require('jsonwebtoken');

exports.createNotification = async (req, res) => {
    try {
        // Pegar o token do cabeçalho da requisição
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
          return res.status(401).json({ message: 'Token não fornecido' });
        }
    
        // Verificar e decodificar o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sua_chave_secreta');
        const userId = decoded.id;

        const { reporteId } = req.params;
        const { isRead } = false;
        let message = `Status update on report ${reporteId}`;

        // Cria a notificação
        const notification = await Notification.create({
            userId,
            reportId: reporteId,
            message,
            read: isRead
        });

        res.status(201).json({
            message: 'Notificação criada com sucesso',
            data: notification
        });
    } catch (err) {
        console.error('Erro na criação de notificação:', err);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}