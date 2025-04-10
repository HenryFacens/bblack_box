const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user')(sequelize, DataTypes);
const Reporte = require('./reporte')(sequelize, DataTypes);
const Categoria = require('./categoria')(sequelize, DataTypes);
const Status = require('./status')(sequelize, DataTypes);
const InteracoesReporte = require('./interacoesReporte')(sequelize, DataTypes);
const ComentarioReporte = require('./comentarioReporte')(sequelize, DataTypes);

module.exports = {
    sequelize,
    User,
    Reporte,
    Categoria,
    Status,
    InteracoesReporte,
    ComentarioReporte,
  };