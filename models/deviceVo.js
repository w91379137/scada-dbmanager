'use strict';

module.exports = function (sequelize, dataTypes) {
  return sequelize.define('device_list', {
    scadaId: {
      type: dataTypes.STRING,
      field: 'scada_id',
      primaryKey: true,
      allowNull: false
    },
    deviceId: {
      type: dataTypes.STRING,
      field: 'device_id',
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: dataTypes.STRING,
      field: 'device_name',
      allowNull: false
    },
    comportNbr: {
      type: dataTypes.INTEGER,
      field: 'comport_nbr',
      allowNull: false
    },
    description: {
      type: dataTypes.STRING,
      field: 'device_description',
      allowNull: false,
      defaultValue: ''
    },
    ip: {
      type: dataTypes.STRING,
      field: 'device_ip',
      allowNull: true
    },
    port: {
      type: dataTypes.INTEGER,
      field: 'device_port',
      allowNull: true
    },
    type: {
      type: dataTypes.INTEGER,
      field: 'device_type',
      allowNull: false
    }
  }, {
    timestamps: false,  // remove createAt and updateAt attributes
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'scada.device_list'
  });
};
