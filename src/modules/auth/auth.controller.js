const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const https = require('https');
const axios = require('axios');
const agent = new https.Agent({ family: 4 });
const fs = require('fs');
const path = require('path');
const { User, RefreshToken, DeleteUser } = require('../../models'); // Importando modelos de User e RefreshToken
const { generateRefreshToken, generateAccessToken, createRefreshToken, removeRefreshToken } = require('../../services/tokenService');
const { verifyToken } = require('../../services/authService');

async function register(req, res) {
  try {
    const { nome, email, senha, birthdate, cpf, cep } = req.body;
    const role = 'user';

    let address = null, bairro = null, localidade = null, uf = null;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    const deletedUser = await DeleteUser.findOne({
      where: {
        [Op.or]: [
          { userNameToBeDeleted: nome},
          { motivo: { [Op.like]: `%${email}%` } }
        ]
      }
    });

    if (deletedUser) {
      return res.status(400).json({
        error: 'Não é possível registrar este usuário',
        message: 'O nome de usuário ou email já está associado a um usuário excluído.'
      });
    }

    // Se o CEP for informado, buscar os dados na API ViaCEP
    if (cep) {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`, {
        httpsAgent: agent
      });
      if (!response.data.erro) {
        address = response.data.logradouro;
        bairro = response.data.bairro;
        localidade = response.data.localidade;
        uf = response.data.uf;
      }
    }

    const fotosPerfilDir = path.join(__dirname, '..', '..', '..', 'static', 'fotosPerfil');

    // Lê os arquivos do diretório
    const fotos = fs.readdirSync(fotosPerfilDir);

    // Seleciona uma foto aleatória
    const fotosSorted = fotos[Math.floor(Math.random() * fotos.length)];

    // Salva o caminho relativo incluindo src/static/fotosPerfil
    const fotoPerfil = `fotosPerfil/${fotosSorted}`;

    // Criar o usuário no banco de dados
    const user = await User.create({
      nome,
      email,
      senha: hashedPassword, 
      role,
      birthdate,
      cpf,
      cep,
      address,
      bairro,
      localidade,
      uf,
      fotoPerfil
    });

    // Gerar o token de acesso e o refresh token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Salvar o refresh token na base de dados
    await createRefreshToken(user.id, refreshToken);

    return res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao cadastrar usuário', details: error.errors ? error.errors.map(err => err.message) : error.message  });
  }
}

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Credenciais inválidas' });

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) return res.status(400).json({ message: 'Credenciais inválidas' });

    // Gerar o token de acesso e o refresh token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Armazenar o refresh token na base de dados (remover qualquer refresh token anterior)
    await removeRefreshToken(refreshToken); // Remove um refresh token antigo, se houver
    await createRefreshToken(user.id, refreshToken); // Cria um novo refresh token

    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    // Verificar e decodificar o token de acesso da requisição
    const decoded = verifyToken(req);

    // Buscar o usuário pelo ID do token
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Buscar o refresh token associado ao usuário no banco de dados
    const refreshToken = await RefreshToken.findOne({ where: { userId: user.id } });

    if (refreshToken) {
      // Se o refresh token existir, removê-lo do banco de dados
      await removeRefreshToken(refreshToken.token); // Método para remover o refresh token
    }

    // Responder com uma mensagem de sucesso
    return res.status(200).json({ message: `Logout realizado com sucesso por ${user.nome}` });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao fazer logout', details: error.message });
  }
};

exports.register = register;