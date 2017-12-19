'use strict';

module.exports = function (sequelize, dataTypes) {
  return sequelize.define('struct_model', {
    projectId: {
      type: dataTypes.STRING,
      field: 'proj_id'
    },
    scadaId: {
      type: dataTypes.STRING,
      field: 'scada_id'
    },
    scadaName: {
      type: dataTypes.STRING,
      field: 'scada_name'
    },
    deviceId: {
      type: dataTypes.STRING,
      field: 'device_id'
    },
    deviceName: {
      type: dataTypes.STRING,
      field: 'device_name'
    },
    tagName: {
      type: dataTypes.STRING,
      field: 'tag_name'
    },
    userId: {
      type: dataTypes.STRING,
      field: 'user_id'
    },
    configUpdated: {
      type: dataTypes.BOOLEAN,
      filed: 'config_updated'
    }
  }, {
    timestamps: false,  // remove createAt and updateAt attributes
    freezeTableName: false // Model tableName will be the same as the model name
  });
};
