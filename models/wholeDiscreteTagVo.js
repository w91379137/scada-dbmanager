'use strict';

/**
 * tagList join tag_discrete
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
    state0: {
      type: dataTypes.STRING,
      field: 'state_0',
      allowNull: false,
      defaultValue: ''
    },
    state1: {
      type: dataTypes.STRING,
      field: 'state_1',
      allowNull: false,
      defaultValue: ''
    },
    state2: {
      type: dataTypes.STRING,
      field: 'state_2',
      allowNull: false,
      defaultValue: ''
    },
    state3: {
      type: dataTypes.STRING,
      field: 'state_3',
      allowNull: false,
      defaultValue: ''
    },
    state4: {
      type: dataTypes.STRING,
      field: 'state_4',
      allowNull: false,
      defaultValue: ''
    },
    state5: {
      type: dataTypes.STRING,
      field: 'state_5',
      allowNull: false,
      defaultValue: ''
    },
    state6: {
      type: dataTypes.STRING,
      field: 'state_6',
      allowNull: false,
      defaultValue: ''
    },
    state7: {
      type: dataTypes.STRING,
      field: 'state_7',
      allowNull: false,
      defaultValue: ''
    }
  });
};
