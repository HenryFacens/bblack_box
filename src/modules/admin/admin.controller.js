class AdminController {
    constructor(adminService, authService, errorHandler) {
        this.adminService = adminService;
        this.authService = authService;
        this.errorHandler = errorHandler;
    }

    async listUsers(req, res) {
        try {
            this.authService.verifyToken(req);
            const users = await this.adminService.getAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            return this.errorHandler.handleError(error, res);
        }
    }

    async updateUserRole(req, res) {
        try {
            this.authService.verifyToken(req);
            const { userId } = req.params;
            const { newRole } = req.body;
            
            const updatedUser = await this.adminService.updateRole(userId, newRole);
            return res.status(200).json({
                message: 'Role do usuário atualizada com sucesso',
                user: updatedUser
            });
        } catch (error) {
            return this.errorHandler.handleError(error, res);
        }
    }

    async deleteUser(req, res) {
        try {
            const decoded = this.authService.verifyToken(req);
            const { userNameToBeDeleted, motivo } = req.body;
            
            const result = await this.adminService.deleteUser({
                userNameToBeDeleted,
                motivo,
                requesterId: decoded.id
            });
            
            return res.status(200).json(result);
        } catch (error) {
            return this.errorHandler.handleError(error, res);
        }
    }

    async banUser(req, res) {
        try {
            const decoded = this.authService.verifyToken(req);
            const { UserNameBanned, reason, reporteId } = req.body;
            
            const result = await this.adminService.banUser({
                UserNameBanned,
                reason,
                requesterId: decoded.id,
                reporteId
            });
            
            return res.status(200).json(result);
        } catch (error) {
            return this.errorHandler.handleError(error, res);
        }
    }
}

module.exports = AdminController;