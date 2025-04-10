const jwt = require('jsonwebtoken');

const { Status } = require('../../models');

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