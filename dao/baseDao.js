'use strict';

let _sequelize = null;

class BaseDao {
  constructor (sequelize) {
    _sequelize = sequelize;
  }
}

module.exports = BaseDao;
