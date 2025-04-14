const jwt = require('jsonwebtoken');
const { RefreshToken } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'chave_refresh_secreta';

// Geração de Access Token
exports.generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role }, 
    JWT_SECRET, 
    { expiresIn: '15m' } // Expiração de 15 minutos
  );
};

// Geração de Refresh Token
exports.generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id }, 
    REFRESH_SECRET, 
    { expiresIn: '7d' } // Expiração de 7 dias
  );
};

// Verificação de Refresh Token
exports.verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, REFRESH_SECRET);
  } catch (err) {
    throw new Error('Refresh Token inválido ou expirado');
  }
};

// Criar novo Refresh Token no banco de dados
exports.createRefreshToken = async (userId, refreshToken) => {
  // Verificar se já existe um refresh token para o usuário
  const existingToken = await RefreshToken.findOne({ where: { userId } });

  // Se existir, removemos o token antigo
  if (existingToken) {
    await this.removeRefreshToken(existingToken.token);
  }

  // Criar novo refresh token
  await RefreshToken.create({
    userId,
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Expira em 7 dias
  });
};

// Remover Refresh Token do banco de dados
exports.removeRefreshToken = async (refreshToken) => {
  await RefreshToken.destroy({ where: { token: refreshToken } });
};

// Regenerar Access Token com Refresh Token
exports.regenerateAccessToken = async (refreshToken) => {
  // Verificar se o refresh token é válido
  const decoded = this.verifyRefreshToken(refreshToken);

  // Buscar o usuário associado ao refresh token
  const user = await User.findByPk(decoded.id);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  // Gerar novo access token
  const newAccessToken = this.generateAccessToken(user);
  
  return newAccessToken;
};
