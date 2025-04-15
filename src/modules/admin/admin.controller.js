const { User } = require('../../models');
const { verifyToken } = require('../../services/authService');
const { deleteUserByName } = require('../../services/adminPanel');

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

exports.deleteUser = async (req, res) => {
    try {
        const decoded = verifyToken(req);

        const { userNameToBeDeleted, motivo } = req.body;

        const userId = decoded.id;

        // Validações adicionais no controller
        if (!userNameToBeDeleted) {
            return res.status(400).json({ 
                success: false, 
                message: 'Nome do usuário é obrigatório' 
            });
        }

        if (!motivo) {
            return res.status(400).json({ 
                success: false, 
                message: 'Motivo é obrigatório' 
            });
        }
        const result = await deleteUserByName({ 
            userNameToBeDeleted,
            motivo,
            userId 
        });

        return res.status(200).json(result);

    } catch (error) {
        console.error('Erro ao deletar usuário:', error);

        // Mapeamento de erros para status HTTP apropriados
        const errorMappings = {
            'Usuário não encontrado': 404,
            'Não é permitido deletar seu próprio usuário': 403,
            'Nome do usuário é obrigatório': 400,
            'Motivo é obrigatório': 400
        };

        const statusCode = errorMappings[error.message] || 500;
        
        return res.status(statusCode).json({ 
            success: false,
            message: error.message || 'Erro interno do servidor'
        });
    }
};