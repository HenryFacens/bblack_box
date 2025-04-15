'use strict';

module.exports = (sequelize, DataTypes) => {
    const deleteUser = sequelize.define('deleteUser', {
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

    deleteUser.associate = (models) => {
        deleteUser.belongsTo(models.User, {
            foreignKey: 'userNameToBeDeleted',
            targetKey: 'nome',
            as: 'userToDelete'
        });
    };

    return deleteUser;
}