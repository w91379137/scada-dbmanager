'use strict';

module.exports = function (sequelize, dataTypes) {
  return sequelize.define('scada_list', {
    scadaId: {
      type: dataTypes.STRING,
      field: 'scada_id',
      primaryKey: true,
      allowNull: false
    },
    scadaName: {
      type: dataTypes.STRING,
      field: 'scada_name',
      allowNull: false
    },
    description: {
      type: dataTypes.STRING,
      field: 'scada_description',
      allowNull: false,
      defaultValue: ''
    },
    primaryIP: {
      type: dataTypes.STRING,
      field: 'primary_scada_ip',
      allowNull: false
    },
    primaryPort: {
      type: dataTypes.INTEGER,
      field: 'primary_scada_port',
      allowNull: false
    },
    backupIP: {
      type: dataTypes.STRING,
      field: 'backup_scada_ip',
      allowNull: true
    },
    backupPort: {
      type: dataTypes.INTEGER,
      field: 'backup_scada_port',
      allowNull: true
    },
    type: {
      type: dataTypes.INTEGER,
      field: 'scada_type',
      allowNull: false
    },
    heartbeat: {
      type: dataTypes.INTEGER,
      field: 'heartbeat',
      allowNull: false
    }
  }, {
    timestamps: false,  // remove createAt and updateAt attributes
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'scada.scada_list'
  });
};
