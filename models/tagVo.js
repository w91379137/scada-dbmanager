'use strict';

module.exports = function (sequelize, dataTypes) {
  return sequelize.define('tag_list', {
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
      field: 'tag_name',
      primaryKey: true,
      allowNull: false
    },
    description: {
      type: dataTypes.STRING,
      field: 'tag_description',
      allowNull: false,
      defaultValue: ''
    },
    alarmStatus: {
      type: dataTypes.BOOLEAN,
      field: 'alarm_status',
      allowNull: false,
      defaultValue: false
    },
    type: {
      type: dataTypes.INTEGER,
      field: 'tag_type',
      allowNull: false
    }
  }, {
    timestamps: false,  // remove createAt and updateAt attributes
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'scada.tag_list'
  });
};
