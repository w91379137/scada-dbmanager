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
    name: {
      type: dataTypes.STRING,
      field: 'tag_name',
      primaryKey: true,
      allowNull: false
    },
    hhPriority: {
      type: dataTypes.INTEGER,
      field: 'hh_priority',
      allowNull: false
    },
    hhAlarm: {
      type: dataTypes.DOUBLE,
      field: 'hh_alarm',
      allowNull: false
    },
    hiPriority: {
      type: dataTypes.INTEGER,
      field: 'hi_priority',
      allowNull: false
    },
    hiAlarm: {
      type: dataTypes.DOUBLE,
      field: 'hi_alarm',
      allowNull: false
    },
    loPriority: {
      type: dataTypes.INTEGER,
      field: 'lo_priority',
      allowNull: false
    },
    loAlarm: {
      type: dataTypes.DOUBLE,
      field: 'lo_alarm',
      allowNull: false
    },
    llPriority: {
      type: dataTypes.INTEGER,
      field: 'll_priority',
      allowNull: false
    },
    llAlarm: {
      type: dataTypes.DOUBLE,
      field: 'll_alarm',
      allowNull: false
    }
  }, {
    timestamps: false,  // remove createAt and updateAt attributes
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'scada.alarm_analog'
  });
};
