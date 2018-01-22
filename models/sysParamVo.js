'use strict';

module.exports = function (sequelize, dataTypes) {
  return sequelize.define('sys_parameters', {
    key: {
      type: dataTypes.STRING(32),
      field: 'param_name',
      allowNull: false,
      primaryKey: true
    },
    value: {
      type: dataTypes.STRING(256),
      field: 'param_value',
      primaryKey: true,
      allowNull: false
    }
  }, {
    timestamps: false,  // remove createAt and updateAt attributes
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'scada.sys_parameters'
  });
};
