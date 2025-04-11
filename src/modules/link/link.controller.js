const service = require('../../services/linkService');
const jwt = require('jsonwebtoken');

exports.gerarLink = async (req, res) =>{
  const { reporteId } = req.params;

  try {
    // Pegar token do cabeçalho da requisição
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }
    // Verificar e decodificar o token
    jwt.verify(token, process.env.JWT_SECRET || 'sua_chave_secreta');
    
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
    // Pegar token do cabeçalho da requisição
    const JWTtoken = req.header('Authorization')?.replace('Bearer ', '');
    if (!JWTtoken) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }
    // Verificar e decodificar o token
    jwt.verify(JWTtoken, process.env.JWT_SECRET || 'sua_chave_secreta');

    const reporte = await service.acessarLink(token);
    return res.status(200).json(reporte);
  } catch (error) {
    console.error('Erro ao acessar link de compartilhamento: ', error);
    res.status(400).json({ error: error.message });
  }
};