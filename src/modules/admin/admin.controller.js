const { User } = require('../../models');
const { verifyToken } = require('../../services/authService');

exports.listUsers = async (req, res) => {
    try {
        verifyToken(req);

        const users = await User.findAll({
            attributes: ['id', 'nome', 'email', 'role', 'createdAt', 'birthdate', 'cpf', 'cep', 'address', 'bairro', 'localidade', 'uf', 'fotoPerfil']
        });
        return res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao listar usuários: ', error);
        res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
    }
}

exports.updateUserRole = async (req, res) => {
    try {
        verifyToken(req);

        const { userId } = req.params;
        const { newRole } = req.body;

        const validRoles = ['user', 'externo', 'admin'];
        if (!validRoles.includes(newRole)){
            return res.status(400).json({ message: `Role inválida. Use: ${validRoles.join(', ')}` });
        }

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        user.role = newRole;
        await user.save();

        return res.status(200).json({ message: 'Role do usuário atualizada com sucesso', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao atualizar role' });
    }
}