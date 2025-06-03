'use strict';

module.exports = (sequelize, DataTypes) => {
    const Categoria = sequelize.define('Categoria', {
        categoriasReporte: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'categoria',
        timestamps: true
    });

    return Categoria;
};