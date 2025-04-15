'use strict';

module.exports = (sequelize, DataTypes) => {
    const BannedUsers = sequelize.define('BannedUsers', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        UserNameBanned: {
            type: DataTypes.STRING,
            allowNull: false
        },
        motivo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        banExpiryDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reporteId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        blockCount: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'BannedUsers',
        timestamps: true  
    });
    return BannedUsers;
}