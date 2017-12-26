'use strict';

module.exports = function (sequelize, dataTypes) {
  return sequelize.define('project_list', {
    projectId: {
      type: dataTypes.STRING(32),
      field: 'proj_id',
      primaryKey: true,
      allowNull: false
    },
    description: {
      type: dataTypes.STRING(256),
      field: 'proj_description',
      allowNull: true
    }
  }, {
    timestamps: false,  // remove createAt and updateAt attributes
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'scada.project_list'
  });
};
