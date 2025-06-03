const { Notification } = require('../models');

exports.createNotification = async ({ userId, reporteId, newStatus }) => {
  try {
    const message = `Status do reporte ${reporteId} atualizado para "${newStatus}"`;

    const notification = await Notification.create({
      userId,
      reporteId,
      message,
      read: false
    });

    return notification;

  } catch (error) {
    console.error('Erro ao criar notificação:', error.message);
    throw new Error('Falha ao criar notificação.');
  }
};
