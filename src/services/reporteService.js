const { Reporte } = require('../models');
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
                ]
            ]
        }
    });
}

module.exports = {
    getLikesandDislikes,
};