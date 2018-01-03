'use strict';

const Promise = require('bluebird');
// var squel = require('squel').useFlavour('postgres');

var userVo = null;
var userScopeVo = null;
var userAllowDeviceVo = null;
var _sequelize = null;

function _init (sequelize) {
  userVo = sequelize.import('../models/userVo');
  userScopeVo = sequelize.import('../models/userScopeVo');
  userAllowDeviceVo = sequelize.import('../models/userAllowDeviceVo');
  _sequelize = sequelize;
}

function _getUserList () {
  return userVo.findAll();
}

function _getUserById (userId) {
  return userVo.findOne({ where: {userId} });
}

function _getUserByName (userName) {
  return userVo.findOne({where: {userName}});
}

function _getUserScopeById (userId) {
  return userScopeVo.findAll({where: {userId}});
}

function _insertUser (userObj, trans) {
  return userVo.findOne({where: {userName: userObj.userName}}).then((user) => {
    if (user) {
      Promise.reject(Error('userName is duplicated'));
    }
    return userVo.create(userObj, { transaction: trans });
  });
}

function _insertUserScopeById (userId, scopeList, trans) {
  let array = [];
  for (let idx = 0; idx < scopeList.length; idx++) {
    array.push({ userId: userId, scopeId: scopeList[idx] });
  }
  return userScopeVo.bulkCreate(array, { transaction: trans });
}

function _updateUserByName (userName, userObj, trans) {
  return userVo.update(userObj, { where: {userName}, transaction: trans });
}

function _updateUserScopeByName (userName, scopeList, trans) {
  return userVo.findOne({where: {userName}}).then(function (user) {
    let array = [];
    for (let idx = 0; idx < scopeList.length; idx++) {
      array.push({userId: user.userId, scopeId: scopeList[idx]});
    }
    return userScopeVo.destroy({where: {userId: user.userId}}, { transaction: trans }).then(function (c) {
      return userScopeVo.bulkCreate(array, { transaction: trans });
    });
  });
}

function _updateUserScopeById (userId, scopeList, trans) {
  let array = [];
  for (let idx = 0; idx < scopeList.length; idx++) {
    array.push({userId: userId, scopeId: scopeList[idx]});
  }
  return userScopeVo.destroy({where: {userId}}, { transaction: trans }).then(function (c) {
    return userScopeVo.bulkCreate(array, { transaction: trans });
  });
}

function _deleteUserById (userId, trans) {
  return userVo.destroy({ where: { userId }, transaction: trans }).then(function (c) {
    return userScopeVo.destroy({ where: {userId}, transaction: trans }).then((result) => {
      return userAllowDeviceVo.destroy({ where: {userId}, transaction: trans });
    });
  });
}

function _deleteUserScope (userId, trans) {
  return userScopeVo.destroy({ where: {userId}, transaction: trans });
}

function _deleteUserAllowDeviceById (userId, trans) {
  return userAllowDeviceVo.destroy({ where: {userId}, transaction: trans });
}

module.exports = {
  init: _init,
  getUserList: _getUserList,
  getUserById: _getUserById,
  getUserByName: _getUserByName,
  getUserScopeById: _getUserScopeById,
  insertUser: _insertUser,
  insertUserScopeById: _insertUserScopeById,
  updateUserByName: _updateUserByName,
  updateUserScopeByName: _updateUserScopeByName,
  updateUserScopeById: _updateUserScopeById,
  deleteUserById: _deleteUserById,
  deleteUserScope: _deleteUserScope,
  deleteUserAllowDeviceById: _deleteUserAllowDeviceById
};
