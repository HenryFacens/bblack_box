class UserController {
    constructor(userService, errorHandler) {
        this.userService = userService;
        this.errorHandler = errorHandler;
    }

    async getProfile(req, res) {
        try {
            const userId = req.user.id; // Já decodificado pelo middleware
            const user = await this.userService.getProfile(userId);
            return res.json(user);
        } catch (error) {
            return this.errorHandler.handleError(error, res, 'Erro ao buscar perfil do usuário');
        }
    }

    async updateProfile(req, res) {
        try {
            const userId = req.user.id;
            const userData = req.body;
            const user = await this.userService.updateProfile(userId, userData);
            return res.json({ 
                message: 'Perfil atualizado com sucesso', 
                user 
            });
        } catch (error) {
            return this.errorHandler.handleError(error, res, 'Erro ao atualizar o perfil do usuário');
        }
    }

    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            await this.userService.forgotPassword(email);
            return res.json({ 
                message: 'Link de redefinição enviado para seu e-mail' 
            });
        } catch (error) {
            return this.errorHandler.handleError(error, res, 'Erro ao enviar e-mail');
        }
    }

    async resetPassword(req, res) {
        try {
            const { token, newPassword, confirmPassword } = req.body;
            await this.userService.resetPassword(token, newPassword, confirmPassword);
            return res.json({ 
                message: 'Senha redefinida com sucesso' 
            });
        } catch (error) {
            return this.errorHandler.handleError(error, res, 'Erro ao redefinir senha');
        }
    }

    async deleteProfile(req, res) {
        try {
            const userId = req.user.id;
            await this.userService.deleteProfile(userId);
            return res.json({ 
                message: 'Perfil deletado com sucesso' 
            });
        } catch (error) {
            return this.errorHandler.handleError(error, res, 'Erro ao deletar o perfil do usuário');
        }
    }
}

module.exports = UserController;