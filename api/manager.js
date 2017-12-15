'use strict';

const Sequelize = require('sequelize');

const ProjectDao = require('../dao/projectDao.js');
const ScadaDao = require('../dao/scadaDao.js');
const DeviceDao = require('../dao/deviceDao.js');
const TagDao = require('../dao/tagDao.js');
const UserDao = require('../dao/userDao.js');
const ScopeDao = require('../dao/scopeDao.js');
const RoleDao = require('../dao/roleDao.js');
const UserAllowDeviceDao = require('../dao/userAllowDeviceDao.js');

let sequelize = null;

function _getConn () {
  return sequelize;
}

function _init (postgresConf) {
  sequelize = new Sequelize(postgresConf.database, postgresConf.username, postgresConf.password, {
    host: postgresConf.hostname,
    dialect: 'postgres',
    pool: {
      max: 10,
      min: 5,
      idle: 10000
    },
    quoteIdentifiers: false,
    logging: false
  });

  ProjectDao.init(sequelize);
  ScadaDao.init(sequelize);
  DeviceDao.init(sequelize);
  TagDao.init(sequelize);
  UserDao.init(sequelize);
  ScopeDao.init(sequelize);
  RoleDao.init(sequelize);
  UserAllowDeviceDao.init(sequelize);
}

module.exports = {
  init: _init,
  conn: _getConn,
  ProjectDao: ProjectDao,
  ScadaDao: ScadaDao,
  DeviceDao: DeviceDao,
  TagDao: TagDao,
  UserDao: UserDao,
  ScopeDao: ScopeDao,
  RoleDao: RoleDao,
  UserAllowDeviceDao: UserAllowDeviceDao
};
