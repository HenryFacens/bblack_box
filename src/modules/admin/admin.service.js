class AdminService {
    constructor(userRepository, userValidator) {
        this.userRepository = userRepository;
        this.userValidator = userValidator;
    }

    async getAllUsers() {
        return this.userRepository.findAll({
            attributes: [
                'id', 'nome', 'email', 'role', 'createdAt',
                'birthdate', 'cpf', 'cep', 'address', 'bairro',
                'localidade', 'uf', 'fotoPerfil'
            ]
        });
    }

    async updateRole(userId, newRole) {
        this.userValidator.validateRole(newRole);
        const user = await this.userRepository.findById(userId);
        
        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        user.role = newRole;
        return user.save();
    }

    async deleteUser({ userNameToBeDeleted, motivo, requesterId }) {
        this.userValidator.validateDeleteUserParams({ userNameToBeDeleted, motivo });
        return this.userRepository.deleteUser({ 
            userNameToBeDeleted,
            motivo,
            requesterId 
        });
    }

    async banUser({ UserNameBanned, reason, requesterId, reporteId }) {
        this.userValidator.validateBanUserParams({ UserNameBanned, reason });
        return this.userRepository.banUser({
            UserNameBanned,
            reason,
            requesterId,
            reporteId
        });
    }
}

module.exports = AdminService;