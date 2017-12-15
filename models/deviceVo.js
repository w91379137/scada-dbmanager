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
    deviceName: {
      type: dataTypes.STRING,
      field: 'device_name',
      allowNull: false
    },
    comportNbr: {
      type: dataTypes.INTEGER,
      field: 'comport_nbr',
      allowNull: true
    },
    description: {
      type: dataTypes.STRING,
      field: 'device_description',
      allowNull: true
    },
    deviceIP: {
      type: dataTypes.STRING,
      field: 'device_ip',
      allowNull: true
    },
    devicePort: {
      type: dataTypes.INTEGER,
      field: 'device_port',
      allowNull: true
    },
    deviceType: {
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
