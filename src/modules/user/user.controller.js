const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const { verifyToken } = require('../../services/authService');

exports.getProfile = async (req, res) => {
  try {
    const decoded = verifyToken(req);
    const userId = decoded.id; // Pegamos o ID do usuário a partir do token

    // Buscar o usuário no banco de dados
    const user = await User.findByPk(userId, {
      attributes: ['id', 'nome', 'email', 'role', 'birthdate', 'cpf', 'cep', 'address', 'bairro', 'localidade', 'uf']
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar perfil do usuário', details: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const decoded = verifyToken(req);
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
      if (req.body[field] !== undefined && req.body[field] !== '' && req.body[field] != "string") {
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

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    // Cria token com validade curta
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    // Link de reset
    const resetLink = `http://localhost:8081/reset-password?token=${token}`;

    // Enviar e-mail com link
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: 'Redefinir sua senha',
      html: `<p>Clique no link abaixo para redefinir sua senha:</p><a href="${resetLink}">${resetLink}</a>`,
    });

    res.json({ message: 'Link de redefinição enviado para seu e-mail' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao enviar e-mail', details: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword, confirmPassword } = req.body;

  if (!token) {
    return res.status(400).json({ 
      error: 'Token não fornecido', 
      details: 'Token de redefinição de senha é obrigatório' 
    });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'As senhas não coincidem' });
  }

  try {
    // Aqui está a correção principal: usar o token do body
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use sua chave secreta
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ senha: hashedPassword });

    res.json({ message: 'Senha redefinida com sucesso' });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ 
        error: 'Token expirado', 
        details: 'O link de redefinição de senha expirou' 
      });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ 
        error: 'Token inválido', 
        details: 'Token de redefinição de senha inválido' 
      });
    }
    res.status(400).json({ 
      error: 'Erro ao redefinir senha', 
      details: error.message 
    });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const decoded = verifyToken(req);
    const userId = decoded.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Deletar o usuário
    await user.destroy();

    res.json({ message: 'Perfil deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar o perfil do usuário', details: error.message });
  }
};