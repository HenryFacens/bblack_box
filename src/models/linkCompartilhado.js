'use strict';

module.exports = (sequelize, DataTypes) => {
  const LinkCompartilhado = sequelize.define('LinkCompartilhado', {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    reporteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    expiracao: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'link_compartilhado',
    timestamps: true
  });

  LinkCompartilhado.associate = (models) => {
    LinkCompartilhado.belongsTo(models.Reporte, {
      foreignKey: 'reporteId',
      as: 'reporte'
    });
  };

  return LinkCompartilhado;
};
