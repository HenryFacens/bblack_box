class AdminRepository {
    constructor(UserModel) {
        this.UserModel = UserModel;
    }

    async findAll(options) {
        return this.UserModel.findAll(options);
    }

    async findById(id) {
        return this.UserModel.findByPk(id);
    }

    async deleteUser({ userNameToBeDeleted, motivo, requesterId }) {
        // Implementação do deleteUserByName
    }

    async banUser({ UserNameBanned, reason, requesterId, reporteId }) {
        // Implementação do bannedUsers
    }
}

module.exports = AdminRepository;