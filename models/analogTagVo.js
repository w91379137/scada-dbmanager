'use strict';

module.exports = function (sequelize, dataTypes) {
  return sequelize.define('tag_analog', {
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
    engUnit: {
      type: dataTypes.STRING,
      field: 'eng_unit',
      allowNull: false,
      defaultValue: ''
    },
    spanHigh: {
      type: dataTypes.STRING,
      field: 'span_high',
      allowNull: false,
      defaultValue: 100
    },
    spanLow: {
      type: dataTypes.STRING,
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
  }, {
    timestamps: false,  // remove createAt and updateAt attributes
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'scada.tag_analog'
  });
};
