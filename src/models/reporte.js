'use strict';

module.exports = (sequelize, DataTypes) => {
    const Reporte = sequelize.define('Reporte', {
        /**
         * Campos do banco de dados
         * Foto do perfil nulo-> false
         * Nome do perfil nulo-> false
         * Horário do reporte nulo-> false
         * Localização do reporte nulo-> false
         * Descrição do reporte nulo-> false
         * Imagem do reporte nulo-> false
         * Avaliação do reporte (1 a 5) nulo-> true
         */
        fotoPerfil: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        nomePerfil: {
            type: DataTypes.STRING,
            allowNull: false
        },
        horarioReporte: {
            type: DataTypes.DATE,
            allowNull: false
        },
        localizacaoReporte: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descricaoReporte: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imagemReporte: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avaliacaoReporte: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 0,
                max: 5
            }
        },
        categoriaReporte: {
            type: DataTypes.STRING,
            allowNull: false
        },
        statusReporte: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'reporte',
        timestamps: true
    });

    Reporte.associate = (models) => {
        Reporte.hasMany(models.ComentarioReporte, {
            foreignKey: 'reporteId',
            as: 'comentarios'
        });
    };

    return Reporte;
};