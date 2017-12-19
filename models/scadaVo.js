'use strict';

module.exports = function (sequelize, dataTypes) {
  return sequelize.define('scada_list', {
    projectId: {
      type: dataTypes.STRING(32),
      field: 'proj_id',
      allowNull: true
    },
    scadaId: {
      type: dataTypes.STRING,
      field: 'scada_id',
      primaryKey: true,
      allowNull: false
    },
    scadaName: {
      type: dataTypes.STRING,
      field: 'scada_name',
      allowNull: false,
      defaultValue: ''
    },
    description: {
      type: dataTypes.STRING,
      field: 'scada_description',
      allowNull: true
    },
    primaryScadaIP: {
      type: dataTypes.STRING,
      field: 'primary_scada_ip',
      allowNull: true
    },
    primaryScadaPort: {
      type: dataTypes.INTEGER,
      field: 'primary_scada_port',
      allowNull: true
    },
    backupScadaIP: {
      type: dataTypes.STRING,
      field: 'backup_scada_ip',
      allowNull: true
    },
    backupScadaPort: {
      type: dataTypes.INTEGER,
      field: 'backup_scada_port',
      allowNull: true
    },
    scadaType: {
      type: dataTypes.INTEGER,
      field: 'scada_type',
      allowNull: false,
      defaultValue: 0
    },
    heartbeat: {
      type: dataTypes.INTEGER,
      field: 'heartbeat',
      allowNull: false,
      defaultValue: 0
    },
    configUploaded: {
      type: dataTypes.BOOLEAN,
      field: 'config_uploaded',
      allowNull: false,
      defaultValue: false
    }
  }, {
    timestamps: false,  // remove createAt and updateAt attributes
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'scada.scada_list'
  });
};
