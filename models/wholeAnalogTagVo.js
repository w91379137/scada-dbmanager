'use strict';

/**
 * tagList join tag_analog
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
    },
    engUnit: {
      type: dataTypes.STRING,
      field: 'eng_unit',
      allowNull: false,
      defaultValue: ''
    },
    spanHigh: {
      type: dataTypes.DOUBLE,
      field: 'span_high',
      allowNull: false,
      defaultValue: 100
    },
    spanLow: {
      type: dataTypes.DOUBLE,
      field: 'span_low',
      allowNull: false,
      defaultValue: 0
    },
    intDspFmt: {
      type: dataTypes.INTEGER,
      field: 'int_dsp_fmt',
      allowNull: false,
      defaultValue: 4
    },
    fraDspFmt: {
      type: dataTypes.INTEGER,
      field: 'fra_dsp_fmt',
      allowNull: false,
      defaultValue: 2
    }
  });
};
