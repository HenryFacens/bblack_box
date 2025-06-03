module.exports = (sequelize, DataTypes) => {
    const InteracoesReporte = sequelize.define('InteracoesReporte', {
      tipo: {
        type: DataTypes.ENUM('like', 'dislike'),
        allowNull: false
      },
      userId: DataTypes.INTEGER,
      reporteId: DataTypes.INTEGER
    }, {
      tableName: 'InteracoesReporte'
    });
  
    InteracoesReporte.associate = (models) => {
      InteracoesReporte.belongsTo(models.User, { foreignKey: 'userId' });
      InteracoesReporte.belongsTo(models.Reporte, { foreignKey: 'reporteId' });
    };
  
    return InteracoesReporte;
  };
  