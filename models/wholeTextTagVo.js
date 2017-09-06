'use strict';

/**
 * tagList join tag_text
 */

module.exports = function (sequelize, dataTypes) {
  return sequelize.define('whole_analog_tag', {
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
    tagName: {
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
    },
    arraySize: {
      type: dataTypes.INTEGER,
      field: 'array_size',
      allowNull: false,
      defaultValue: 0
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
    }
  });
};
