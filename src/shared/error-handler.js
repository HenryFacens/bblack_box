class ErrorHandler {
    constructor() {
        this.errorMappings = {
            ValidationError: 400,
            NotFoundError: 404,
            AuthorizationError: 403,
            DefaultError: 500
        };
    }

    handleError(error, res) {
        const statusCode = this.errorMappings[error.constructor.name] || 500;
        
        return res.status(statusCode).json({
            success: false,
            message: error.message || 'Erro interno do servidor'
        });
    }
}

module.exports = ErrorHandler;