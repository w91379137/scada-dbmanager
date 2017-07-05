'use strict';

module.exports = function (sequelize, dataTypes) {
  return sequelize.define('tag_text', {
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
      allowNull: true
    },
    dataLog: {
      type: dataTypes.BOOLEAN,
      field: 'data_log',
      allowNull: false,
      defaultValue: false
    },
    readOnly: {
      type: dataTypes.BOOLEAN,
      field: 'read_only',
      allowNull: false,
      defaultValue: false
    },
    arraySize: {
      type: dataTypes.INTEGER,
      field: 'array_size',
      allowNull: false,
      defaultValue: 0
    }
  }, {
    timestamps: false,  // remove createAt and updateAt attributes
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'scada.tag_text'
  });
};
