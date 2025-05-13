class AdminValidator {
    validateRole(role) {
        const validRoles = ['user', 'externo', 'admin'];
        if (!validRoles.includes(role)) {
            throw new ValidationError(`Role inválida. Use: ${validRoles.join(', ')}`);
        }
    }

    validateDeleteUserParams({ userNameToBeDeleted, motivo }) {
        if (!userNameToBeDeleted) {
            throw new ValidationError('Nome do usuário é obrigatório');
        }
        if (!motivo) {
            throw new ValidationError('Motivo é obrigatório');
        }
    }

    validateBanUserParams({ UserNameBanned, reason }) {
        if (!UserNameBanned) {
            throw new ValidationError('Nome do usuário a ser banido é obrigatório');
        }
        if (!reason) {
            throw new ValidationError('Motivo do banimento é obrigatório');
        }
    }
}

module.exports = AdminValidator;