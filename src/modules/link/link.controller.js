const { LinkCompartilhado } = require('../models');
const { v4: uuidv4 } = require('uuid');

const gerarLinkCompartilhado = async (req, res) => {
  const { id: reporteId } = req.params;

  try {
    const token = uuidv4();
    const link = `${process.env.BASE_URL || 'http://localhost:3000'}/exportar/${token}`;

    await LinkCompartilhado.create({
      token,
      reporteId,
      expiracao: null // ou adicione lógica de expiração, se quiser
    });

    return res.status(201).json({ link });
  } catch (err) {
    console.error('Erro ao gerar link compartilhado:', err);
    return res.status(500).json({ error: 'Erro ao gerar link.' });
  }
};

module.exports = {
  gerarLinkCompartilhado
};
