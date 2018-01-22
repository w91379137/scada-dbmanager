'use strict';

module.exports = function (sequelize, dataTypes) {
  return sequelize.define('user_info', {
    scopeId: {
      type: dataTypes.STRING(32),
      field: 'scope_id',
      primaryKey: true
    },
    description: {
      type: dataTypes.STRING(256),
      field: 'scope_description',
      allowNull: true
    }
  }, {
    timestamps: false,  // remove createAt and updateAt attributes
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'scada.scope'
  });
};
