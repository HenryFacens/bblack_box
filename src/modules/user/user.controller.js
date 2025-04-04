const { User } = require('../../models');
const jwt = require('jsonwebtoken');

exports.getProfile = (req, res) => {
  res.json({ message: 'Perfil do usuário' });
};

exports.updateProfile = async (req, res) => {
  try {
    // Pegar o token do cabeçalho da requisição
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    // Verificar e decodificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sua_chave_secreta');
    const userId = decoded.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Lista de campos que podem ser atualizados
    const allowedFields = ['nome', 'email', 'role', 'birthdate', 'cep', 'address', 'bairro', 'localidade', 'uf'];

    const updates = {};

    // Preencher somente os campos válidos e não vazios
    for (const field of allowedFields) {
      if (req.body[field] !== undefined && req.body[field] !== '') {
        updates[field] = req.body[field];
      }
    }

    // Atualiza os campos permitidos
    await user.update(updates);

    res.json({ message: 'Perfil atualizado com sucesso', user });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o perfil do usuário', details: error.message });
  }
};