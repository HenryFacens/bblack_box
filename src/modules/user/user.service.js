const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const EmailService = require('./email.service');

class UserService {
    constructor() {
        this.emailService = new EmailService();
    }

    async getProfile(userId) {
        const user = await User.findByPk(userId, {
            attributes: ['id', 'nome', 'email', 'role', 'birthdate', 'cpf', 'cep', 'address', 'bairro', 'localidade', 'uf']
        });

        if (!user) {
            const error = new Error('Usuário não encontrado');
            error.status = 404;
            throw error;
        }

        return user;
    }

    async updateProfile(userId, userData) {
        const user = await User.findByPk(userId);
        if (!user) {
            const error = new Error('Usuário não encontrado');
            error.status = 404;
            throw error;
        }

        const allowedFields = ['nome', 'email', 'role', 'birthdate', 'cep', 'address', 'bairro', 'localidade', 'uf'];
        const updates = {};

        for (const field of allowedFields) {
            if (userData[field] !== undefined && userData[field] !== '' && userData[field] != "string") {
                updates[field] = userData[field];
            }
        }

        await user.update(updates);
        return user;
    }

    async forgotPassword(email) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            const error = new Error('Usuário não encontrado');
            error.status = 404;
            throw error;
        }

        const token = jwt.sign(
            { id: user.id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '15m' }
        );

        const resetLink = `http://localhost:8081/reset-password?token=${token}`;
        await this.emailService.sendPasswordResetEmail(user.email, resetLink);
        
        return true;
    }

    async resetPassword(token, newPassword, confirmPassword) {
        if (!token) {
            const error = new Error('Token não fornecido');
            error.status = 400;
            throw error;
        }

        if (newPassword !== confirmPassword) {
            const error = new Error('As senhas não coincidem');
            error.status = 400;
            throw error;
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findByPk(decoded.id);
            
            if (!user) {
                const error = new Error('Usuário não encontrado');
                error.status = 404;
                throw error;
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await user.update({ senha: hashedPassword });
            
            return true;
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                const err = new Error('O link de redefinição de senha expirou');
                err.status = 400;
                throw err;
            }
            if (error.name === 'JsonWebTokenError') {
                const err = new Error('Token de redefinição de senha inválido');
                err.status = 400;
                throw err;
            }
            throw error;
        }
    }

    async deleteProfile(userId) {
        const user = await User.findByPk(userId);
        if (!user) {
            const error = new Error('Usuário não encontrado');
            error.status = 404;
            throw error;
        }

        await user.destroy();
        return true;
    }
}

module.exports = UserService;