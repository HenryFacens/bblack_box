const jwt = require('jsonwebtoken');
const { createNotification } = require('../../services/notification');

const { Status, Reporte } = require('../../models');

exports.listStatus = async (req, res) => {
    try {
        // Pegar o token do cabeçalho da requisição
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
          return res.status(401).json({ message: 'Token não fornecido' });
        }
    
        // Verificar e decodificar o token
        jwt.verify(token, process.env.JWT_SECRET || 'sua_chave_secreta');

        const status = await Status.findAll({
            attributes: ['statusReporte']
        });

        if (!status) {
            return res.status(404).json({ message: 'Status não encontrados' });
        }

        const statusList = status.map(item => item.statusReporte);
        return res.status(200).json({
            data: statusList
        });

    } catch (error) {
        console.error('Erro ao listar status: ', error);
        res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
    }
}

exports.updateStatusReporte = async (req, res) => {
    try {
      const { reporteId } = req.params;
      const { newStatus } = req.body;
      // Pegar o token do cabeçalho da requisição
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
      }
  
      // Verificar e decodificar o token
      jwt.verify(token, process.env.JWT_SECRET || 'sua_chave_secreta');
  
      if (!reporteId || isNaN(reporteId)) {
        return res.status(400).json({ message: 'ID do reporte inválido ou não fornecido.' });
      }
  
      const reporte = await Reporte.findByPk(reporteId);
      if (!reporte) {
        return res.status(404).json({ message: 'Reporte não encontrado.' });
      }
  
      // Buscar lista de status válidos
      const statusList = await Status.findAll({ attributes: ['statusReporte'] });
      const validStatuses = statusList.map(item => item.statusReporte);
  
      if (!validStatuses.includes(newStatus)) {
        return res.status(400).json({ message: `Status "${newStatus}" inválido. Válidos: ${validStatuses.join(', ')}` });
      }
  
      // Atualiza o status do reporte
      reporte.statusReporte = newStatus;
      await reporte.save();
  
      // Cria notificação para o usuário relacionado
      await createNotification({
        userId: reporte.userId,
        reporteId: reporte.id,
        newStatus
      });
  
      return res.status(200).json({
        message: 'Status atualizado com sucesso.',
        data: reporte
      });
  
    } catch (error) {
      console.error('Erro ao atualizar status do reporte:', error.message);
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  };