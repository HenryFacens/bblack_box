'use strict';

module.exports = (sequelize, DataTypes) => {
    const DeleteUser = sequelize.define('DeleteUser', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userNameToBeDeleted: {
            type: DataTypes.STRING,
            allowNull: false
        },
        motivo: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'deleteUser',
        timestamps: true  
    });
    return DeleteUser;
}