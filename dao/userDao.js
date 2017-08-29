'use strict';

const Promise = require('bluebird');
var userVo = null;

function _init(sequelize){
    userVo = sequelize.import('../models/userVo');
}

function _getUserList(){
  return userVo.findAll();
}

function _insertUser(user, trans) {
  return userVo.create(user, { transaction: trans });
}

module.exports = {
  init: _init,
  getUserList: _getUserList,
  insertUser: _insertUser,
};