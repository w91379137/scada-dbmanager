'use strict';

module.exports = function (sequelize, dataTypes) {
  return sequelize.define('alarm_analog', {
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
    hhPriority: {
      type: dataTypes.INTEGER,
      field: 'hh_priority',
      allowNull: false,
      defaultValue: 0
    },
    hhAlarm: {
      type: dataTypes.DOUBLE,
      field: 'hh_alarm',
      allowNull: false,
      defaultValue: 0
    },
    hiPriority: {
      type: dataTypes.INTEGER,
      field: 'hi_priority',
      allowNull: false,
      defaultValue: 0
    },
    hiAlarm: {
      type: dataTypes.DOUBLE,
      field: 'hi_alarm',
      allowNull: false,
      defaultValue: 0
    },
    loPriority: {
      type: dataTypes.INTEGER,
      field: 'lo_priority',
      allowNull: false,
      defaultValue: 0
    },
    loAlarm: {
      type: dataTypes.DOUBLE,
      field: 'lo_alarm',
      allowNull: false,
      defaultValue: 0
    },
    llPriority: {
      type: dataTypes.INTEGER,
      field: 'll_priority',
      allowNull: false,
      defaultValue: 0
    },
    llAlarm: {
      type: dataTypes.DOUBLE,
      field: 'll_alarm',
      allowNull: false,
      defaultValue: 0
    }
  }, {
    timestamps: false,  // remove createAt and updateAt attributes
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'scada.alarm_analog'
  });
};
