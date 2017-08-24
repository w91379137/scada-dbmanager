'use strict';

module.exports = function (sequelize, dataTypes) {
  return sequelize.define('tag_text', {
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
    }
  }, {
    timestamps: false,  // remove createAt and updateAt attributes
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'scada.tag_text'
  });
};
