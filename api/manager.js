'use strict';

const Sequelize = require('sequelize');

const ScadaDao = require('../dao/scadaDao.js');
const DeviceDao = require('../dao/deviceDao.js');
const TagDao = require('../dao/tagDao.js');

let sequelize = null;

class Manager {
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

module.exports = Manager;
