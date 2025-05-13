const AuthService = require('../services/authService');
const authService = new AuthService();

exports.authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            const decoded = authService.verifyToken(req);
            req.user = decoded;

            if (!allowedRoles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para acessar este recurso.' });
            }

            next();
        } catch (err) {
            return res.status(401).json({ message: 'Token inválido ou expirado' });
        }
    }; 
};