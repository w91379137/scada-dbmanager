'use strict';

module.exports = function (sequelize, dataTypes) {
  return sequelize.define('user_allow_device', {
    userId: {
      type: dataTypes.INTEGER,
      field: 'user_id',
      primaryKey: true,
      allowNull: false
    },
    projectId: {
      type: dataTypes.STRING(32),
      field: 'proj_id',
      primaryKey: true,
      allowNull: false
    },
    scadaId: {
      type: dataTypes.STRING,
      field: 'scada_id',
      primaryKey: true,
      allowNull: false,
      defaultValue: ''
    },
    deviceId: {
      type: dataTypes.STRING,
      field: 'device_id',
      primaryKey: true,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    timestamps: false,  // remove createAt and updateAt attributes
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'scada.user_allow_device'
  });
};
