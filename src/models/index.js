const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user')(sequelize, DataTypes);
const Reporte = require('./reporte')(sequelize, DataTypes);
const Categoria = require('./categoria')(sequelize, DataTypes);
const Status = require('./status')(sequelize, DataTypes);
const InteracoesReporte = require('./interacoesReporte')(sequelize, DataTypes);
const ComentarioReporte = require('./comentarioReporte')(sequelize, DataTypes);
const LinkCompartilhado = require('./linkCompartilhado')(sequelize, DataTypes);
const Notification = require('./notification')(sequelize, DataTypes);
const RefreshToken = require('./refreshToken')(sequelize, DataTypes);
const DeleteUser = require('./deleteUser')(sequelize, DataTypes);

const db = {
    sequelize,
    User,
    Reporte,
    Categoria,
    Status,
    InteracoesReporte,
    ComentarioReporte,
    LinkCompartilhado,
    Notification,
    RefreshToken,
    DeleteUser,
  };

Object.values(db).forEach(model => {
  if (model?.associate) {
    model.associate(db);
  }
});

module.exports = db;