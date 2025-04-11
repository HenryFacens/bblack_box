const { Reporte, ComentarioReporte, Status } = require('../models');
const { Sequelize } = require('sequelize');

async function getLikesandDislikes(){
    return await Reporte.findAll({
        attributes: {
            include: [
                [
                    Sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM "InteracoesReporte" AS interacoes
                        WHERE
                            interacoes."reporteId" = "Reporte"."id"
                            AND interacoes."tipo" = 'like'
                    )`),
                    'likes'
                ],
                [
                    Sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM "InteracoesReporte" AS interacoes
                        WHERE
                            interacoes."reporteId" = "Reporte"."id"
                            AND interacoes."tipo" = 'dislike'
                    )`),
                    'dislikes'
                ],
            ]
        },
        include: [
            {
                model: ComentarioReporte,
                as: 'comentarios', // ou o alias que você configurou no `associate` do model
                attributes: ['id', 'comentario', 'userId', 'createdAt'], // escolha os campos desejados
            }
        ]
    });
}

module.exports = {
    getLikesandDislikes,
};