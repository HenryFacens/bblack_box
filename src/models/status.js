'use strict';

module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define('Status', {
        statusReporte: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'status',
        timestamps: true
    });

    return Status;
}