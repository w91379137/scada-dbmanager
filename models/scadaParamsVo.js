'use strict';

module.exports = function (sequelize, dataTypes) {
  return sequelize.define('scada_parameters', {
    scadaId: {
      type: dataTypes.STRING,
      field: 'scada_id',
      primaryKey: true,
      allowNull: false
    },
    key: {
      type: dataTypes.STRING,
      field: 'param_name',
      primaryKey: true,
      allowNull: false
    },
    value: {
      type: dataTypes.STRING,
      field: 'param_value',
      primaryKey: true,
      allowNull: false
    }
  }, {
    timestamps: false,  // remove createAt and updateAt attributes
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'scada.scada_parameters'
  });
};
