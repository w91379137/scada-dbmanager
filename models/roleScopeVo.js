'use strict';

module.exports = function (sequelize, dataTypes) {
  return sequelize.define('role_scope', {
    roleId: {
      type: dataTypes.STRING(32),
      field: 'role_id',
      primaryKey: true
    },
    scopeId: {
      type: dataTypes.STRING(32),
      field: 'scope_id',
      primaryKey: true
    }
  }, {
    timestamps: false,  // remove createAt and updateAt attributes
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'scada.scope_role'
  });
};
