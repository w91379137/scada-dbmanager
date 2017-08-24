'use strict';

module.exports = function (sequelize, dataTypes) {
  return sequelize.define('tag_discrete', {
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
  }, {
    timestamps: false,  // remove createAt and updateAt attributes
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'scada.tag_discrete'
  });
}
;
