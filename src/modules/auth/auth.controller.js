const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const https = require('https');
const axios = require('axios');
const agent = new https.Agent({ family: 4 });
const { User } = require('../../models');

const secretKey = process.env.JWT_SECRET || 'sua_chave_secreta';

async function register(req, res) {
  try {
    const { nome, email, senha, role, birthdate, cpf, cep } = req.body;

    let address = null, bairro = null, localidade = null, uf = null;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

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
      uf
    });

    return res.status(201).json(user);
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

    const token = jwt.sign(
      { id: user.id, role: user.role },
      secretKey,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, secretKey);

    // Buscar o usuário pelo ID do token
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    return res.status(200).json({ message: `Logout realizado com sucesso por ${user.nome}` });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao fazer logout', details: error.message });
  }
};


exports.register = register;