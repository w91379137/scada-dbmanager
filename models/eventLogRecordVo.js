'use strict';

module.exports = function (sequelize, dataTypes) {
  return sequelize.define('event_log_record', {
    eventName: {
      type: dataTypes.STRING(128),
      field: 'event_name',
      allowNull: false,
      primaryKey: true
    },
    scadaId: {
      type: dataTypes.STRING(36),
      field: 'scada_id',
      allowNull: false,
      primaryKey: true
    },
    deviceId: {
      type: dataTypes.STRING(256),
      field: 'record_device_id',
      allowNull: false,
      primaryKey: true
    },
    tagName: {
      type: dataTypes.STRING(128),
      field: 'record_tag_name',
      allowNull: false,
      primaryKey: true
    }
  }, {
    timestamps: false, // remove createAt and updateAt attributes
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'scada.event_log_record'
  });
};
