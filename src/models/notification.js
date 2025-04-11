'use strict';

module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      reportId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false
      },
      read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }, {
      tableName: 'notifications',
      timestamps: true
    });
  
    Notification.associate = (models) => {
      Notification.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
  
      Notification.belongsTo(models.Report, {
        foreignKey: 'reportId',
        as: 'report'
      });
    };
  
    return Notification;
  };