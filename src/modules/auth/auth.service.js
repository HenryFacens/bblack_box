const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const https = require('https');
const axios = require('axios');
const agent = new https.Agent({ family: 4 });
const fs = require('fs');
const path = require('path');
const { User, RefreshToken, DeleteUser } = require('../../models');
const { generateRefreshToken, generateAccessToken, createRefreshToken, removeRefreshToken } = require('../../services/tokenService');

class AuthService {
  async register(data) {
    const { nome, email, senha, birthdate, cpf, cep } = data;
    const role = 'user';

    let address = null, bairro = null, localidade = null, uf = null;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    const deletedUser = await DeleteUser.findOne({
      where: {
        [Op.or]: [
          { userNameToBeDeleted: nome },
          { motivo: { [Op.like]: `%${email}%` } }
        ]
      }
    });

    if (deletedUser) {
      const error = new Error('O nome de usuário ou email já está associado a um usuário excluído.');
      error.status = 400;
      throw error;
    }

    if (cep) {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`, { httpsAgent: agent });
      if (!response.data.erro) {
        address = response.data.logradouro;
        bairro = response.data.bairro;
        localidade = response.data.localidade;
        uf = response.data.uf;
      }
    }

    const fotosPerfilDir = path.join(__dirname, '..', '..', '..', 'static', 'fotosPerfil');
    const fotos = fs.readdirSync(fotosPerfilDir);
    const fotosSorted = fotos[Math.floor(Math.random() * fotos.length)];
    const fotoPerfil = `fotosPerfil/${fotosSorted}`;

    const user = await User.create({
      nome, email, senha: hashedPassword, role, birthdate, cpf, cep,
      address, bairro, localidade, uf, fotoPerfil
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    await createRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async login(data) {
    const { email, senha } = data;
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Credenciais inválidas');

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) throw new Error('Credenciais inválidas');

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await removeRefreshToken(refreshToken);
    await createRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async logout(userId) {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('Usuário não encontrado');

    const refreshToken = await RefreshToken.findOne({ where: { userId: user.id } });
    if (refreshToken) {
      await removeRefreshToken(refreshToken.token);
    }
    return { message: `Logout realizado com sucesso por ${user.nome}` };
  }
}

module.exports = AuthService;