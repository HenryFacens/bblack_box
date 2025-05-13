class AuthController {
  constructor(authService, errorHandler) {
    this.authService = authService;
    this.errorHandler = errorHandler;
  }

  async register(req, res) {
    try {
      const result = await this.authService.register(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return this.errorHandler.handleError(error, res, 'Erro ao cadastrar usuário');
    }
  }

  async login(req, res) {
    try {
      const result = await this.authService.login(req.body);
      return res.json(result);
    } catch (error) {
      return this.errorHandler.handleError(error, res, 'Erro ao fazer login');
    }
  }

  async logout(req, res) {
    try {
      const decoded = req.user; // já decodificado pelo middleware
      const result = await this.authService.logout(decoded.id);
      return res.status(200).json(result);
    } catch (error) {
      return this.errorHandler.handleError(error, res, 'Erro ao fazer logout');
    }
  }
}

module.exports = AuthController;