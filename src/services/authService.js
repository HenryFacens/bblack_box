const jwt = require('jsonwebtoken');

const verifyToken = (req) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    const error = new Error('Token não fornecido');
    error.status = 401;
    throw error;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sua_chave_secreta');
    return decoded;
  } catch (err) {
    const error = new Error('Token inválido');
    error.status = 401;
    throw error;
  }
};

module.exports = {
  verifyToken
};
