const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_FROM,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    async sendPasswordResetEmail(email, resetLink) {
        await this.transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Redefinir sua senha',
            html: `<p>Clique no link abaixo para redefinir sua senha:</p><a href="${resetLink}">${resetLink}</a>`,
        });
    }
}

module.exports = EmailService;