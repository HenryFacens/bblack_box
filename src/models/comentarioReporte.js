module.exports = (sequelize, DataTypes) => {
    const ComentarioReporte = sequelize.define('ComentarioReporte', {
      comentario: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: DataTypes.INTEGER,
      reporteId: DataTypes.INTEGER
    }, {
      tableName: 'ComentarioReporte'
    });
  
    ComentarioReporte.associate = (models) => {
      ComentarioReporte.belongsTo(models.User, { foreignKey: 'userId' });
      ComentarioReporte.belongsTo(models.Reporte, { foreignKey: 'reporteId' });
    };
  
    return ComentarioReporte;
  };
  