'use strict';

module.exports = function (sequelize, dataTypes) {
  return sequelize.define('role', {
    roleId: {
      type: dataTypes.STRING(32),
      field: 'role_id',
      primaryKey: true
    },
    roleDesc: {
      type: dataTypes.STRING(256),
      field: 'role_description',
      allowNull: true
    }
  }, {
    timestamps: false,  // remove createAt and updateAt attributes
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'scada.role'
  });
};
