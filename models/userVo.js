'use strict';

module.exports = function (sequelize, dataTypes) {
  return sequelize.define('user_info', {
    userId: {
      type: dataTypes.INTEGER,
      field: 'user_id',
      primaryKey: true,
      allowNull: false
    },
    userName: {
      type: dataTypes.STRING(128),
      field: 'user_name',
      allowNull: false
    },
    email: {
      type: dataTypes.STRING(256),
      field: 'email',
      allowNull: false
    },
    ssoRole: {
      type: dataTypes.STRING(32),
      field: 'sso_role',      
      allowNull: false
    },
    userDesc: {
      type: dataTypes.STRING(256),
      field: 'user_description',      
      allowNull: true
    }
  }, {
    timestamps: false,  // remove createAt and updateAt attributes
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'scada.user_info'
  });
};
