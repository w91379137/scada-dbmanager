'use strict';

module.exports = function (sequelize, dataTypes) {
  return sequelize.define('project_list', {
    projectId: {
      type: dataTypes.STRING(32),
      field: 'proj_id',
      primaryKey: true,
      allowNull: false,
      unique: {
        msg: 'projectId is duplicated'
      },
      validate: {
        notEmpty: {
          msg: 'projectId cannot be empty'
        },
        len: {
          args: [1, 32],
          msg: 'projectId is out of range'
        }
      }
    },
    description: {
      type: dataTypes.STRING(256),
      field: 'proj_description',
      allowNull: true,
      validate: {
        len: {
          args: [0, 256],
          msg: 'description is out of range'
        }
      }
    }
  }, {
    timestamps: false,  // remove createAt and updateAt attributes
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'scada.project_list'
  });
};
