'use strict';

const Sequelize = require('sequelize');

const ScadaDao = require('../dao/scadaDao.js');
const DeviceDao = require('../dao/deviceDao.js');
const TagDao = require('../dao/tagDao.js');
const UserDao = require('../dao/userDao.js');
const ScopeDao = require('../dao/scopeDao.js');

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

  ScadaDao.init(sequelize);
  DeviceDao.init(sequelize);
  TagDao.init(sequelize);
  UserDao.init(sequelize);
  ScopeDao.init(sequelize);
}

module.exports = {
  init: _init,
  conn: _getConn,
  ScadaDao: ScadaDao,
  DeviceDao: DeviceDao,
  TagDao: TagDao,
  UserDao: UserDao,
  ScopeDao: ScopeDao
};

/* class Manager {
  constructor (conf) {
    sequelize = new Sequelize(conf.database, conf.username, conf.password, {
      host: conf.hostname,
      dialect: 'postgres',
      pool: {
        max: 10,
        min: 5,
        idle: 10000
      },
      quoteIdentifiers: false,
      logging: false
    });
    this.scadaDao = new ScadaDao(sequelize);
    this.deviceDao = new DeviceDao(sequelize);
    this.tagDao = new TagDao(sequelize);

    this.conn = sequelize;
  }

  close () {
    if (sequelize && sequelize != null) {
      sequelize.close();
    }
  }
}

module.exports = Manager; */
