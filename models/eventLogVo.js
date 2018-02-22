'use strict';

module.exports = function (sequelize, dataTypes) {
  return sequelize.define('event_log_list', {
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
    eventDescription: {
      type: dataTypes.STRING(256),
      field: 'event_description',
      allowNull: true,
      primaryKey: false
    },
    deviceId: {
      type: dataTypes.STRING(256),
      field: 'device_id',
      allowNull: false,
      primaryKey: false
    },
    tagName: {
      type: dataTypes.STRING(128),
      field: 'tag_name',
      allowNull: false,
      primaryKey: false
    },
    eventType: {
      type: dataTypes.INTEGER,
      field: 'event_type',
      allowNull: false,
      primaryKey: false
    },
    refValue: {
      type: dataTypes.DOUBLE,
      field: 'ref_value',
      allowNull: true,
      primaryKey: false
    },
    refDeviceId: {
      type: dataTypes.STRING(256),
      field: 'ref_device_id',
      allowNull: true,
      primaryKey: false
    },
    refTagName: {
      type: dataTypes.STRING(128),
      field: 'ref_tag_name',
      allowNull: true,
      primaryKey: false
    },
    sampleInterval: {
      type: dataTypes.INTEGER,
      field: 'sample_interval',
      allowNull: false,
      primaryKey: false
    },
    sampleUnit: {
      type: dataTypes.STRING(36),
      field: 'sample_unit',
      allowNull: false,
      primaryKey: false
    },
    sampleAmount: {
      type: dataTypes.INTEGER,
      field: 'sample_amount',
      allowNull: false,
      primaryKey: false
    }
  }, {
    timestamps: false, // remove createAt and updateAt attributes
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'scada.event_log_list'
  });
};
