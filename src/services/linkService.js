const { LinkCompartilhado, Reporte } = require('../models');
const crypto = require('crypto');

exports.gerarLinkCompartilhado = async (reporteId) => {
    let token;
    let existente;

    do {
        token = crypto.randomBytes(16).toString('hex');
        existente = await LinkCompartilhado.findOne({ where: { token }});
    } while (existente);

    const expiracao = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas

    return await LinkCompartilhado.create({
        token,
        reporteId,
        expiracao,
        usado: false
    });
}

exports.acessarLink = async (token) => {
    const link = await LinkCompartilhado.findOne({
        where: { token },
        include: [{ model: Reporte, as: 'reporte' }]
    });

    if (!link) throw new Error('Link inválido!');
    if (!link.expiracao && link.expiracao < new Date()) throw new Error('Link expirado!');
    if (link.usado) throw new Error('Link já utilizado!');

    link.usado = true;
    await link.save();

    return link.reporte;
}