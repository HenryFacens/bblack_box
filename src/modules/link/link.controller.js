const service = require('../../services/linkService');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../../services/authService');

exports.gerarLink = async (req, res) =>{
  const { reporteId } = req.params;

  try {
    verifyToken(req);
    
    const link = await service.gerarLinkCompartilhado(reporteId);
    return res.status(201).json({ token: link.token, url: `/compartilhamento/acessar/${link.token}` });
    
  } catch (error) {
    console.error('Erro ao gerar link de compartilhamento: ', error);
    res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
  }
}

exports.acessarLink = async (req, res) => {
  const { token } = req.params;

  try {
    verifyToken(req);

    const reporte = await service.acessarLink(token);
    return res.status(200).json(reporte);
  } catch (error) {
    console.error('Erro ao acessar link de compartilhamento: ', error);
    res.status(400).json({ error: error.message });
  }
};