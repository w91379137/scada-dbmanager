'use strict';

module.exports = function (sequelize, dataTypes) {
  return sequelize.define('alarm_discrete', {
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
      allowNull: true
    },
    alarmPriority0: {
      type: dataTypes.INTEGER,
      field: 'alarm_priority_0',
      allowNull: false
    },
    alarmPriority1: {
      type: dataTypes.INTEGER,
      field: 'alarm_priority_1',
      allowNull: false
    },
    alarmPriority2: {
      type: dataTypes.INTEGER,
      field: 'alarm_priority_2',
      allowNull: false
    },
    alarmPriority3: {
      type: dataTypes.INTEGER,
      field: 'alarm_priority_3',
      allowNull: false
    },
    alarmPriority4: {
      type: dataTypes.INTEGER,
      field: 'alarm_priority_4',
      allowNull: false
    },
    alarmPriority5: {
      type: dataTypes.INTEGER,
      field: 'alarm_priority_5',
      allowNull: false
    },
    alarmPriority6: {
      type: dataTypes.INTEGER,
      field: 'alarm_priority_6',
      allowNull: false
    },
    alarmPriority7: {
      type: dataTypes.INTEGER,
      field: 'alarm_priority_7',
      allowNull: false
    }
  }, {
    timestamps: false,  // remove createAt and updateAt attributes
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'scada.alarm_discrete'
  });
};
