'use strict';

const Promise = require('bluebird');
const Utils = require('../common/utils');
var squel = require('squel').useFlavour('postgres');

var userVo = null;
var userScopeVo = null;
var userAllowDeviceVo = null;
var _sequelize = null;
var mapper = {};

function _init (sequelize) {
  userVo = sequelize.import('../models/userVo');
  userScopeVo = sequelize.import('../models/userScopeVo');
  userAllowDeviceVo = sequelize.import('../models/userAllowDeviceVo');
  _sequelize = sequelize;
  for (let key in userVo.attributes) {
    mapper[userVo.attributes[key].field] = key;
  }
}
/**
 * @param {Object} filterObj
 * @param {Integer} filterObj.offset: starting index
 * @param {Integer} filterObj.limit: data retrived
 * @param {String} filterObj.userName: filter user name
 * @param {String} filterObj.sortby: sort properties
 * @param {String} filterObj.order: order asc or not
 *  }
 */
function _getUserList (filterObj = {}) {
  let sortby = filterObj.sortby ? filterObj.sortby : 'userId';
  let order = typeof filterObj.order !== 'undefined' ? (filterObj.order ? 'ASC' : 'DESC') : 'ASC';
  let filter = {
    offset: filterObj.offset ? filterObj.offset : 0,
    limit: filterObj.limit ? filterObj.limit : null,
    order: _sequelize.literal(sortby + ' ' + order)
  };
  if (filterObj.userName) {
    filter.where = {userName: filterObj.userName};
  }
  return userVo.findAndCountAll(filter);
}

function _getUserById (userId) {
  let promises = [];
  promises.push(userVo.findOne({ where: {userId} }));
  promises.push(userScopeVo.findAll({ where: {userId} }));
  return Promise.all(promises).then((result) => {
    let response = {};
    for (let res of result) {
      if (Array.isArray(res)) {
        response.scope = res.map((r) => r.scopeId);
      } else {
        response = Object.assign(response, res.dataValues);
      }
    }
    return Promise.resolve(response);
  });
}

function _getUserByName (userName) {
  return userVo.findOne({where: {userName}}).then((user) => {
    if (!user) {
      return Promise.resolve(user);
    }
    user = user.dataValues;
    return userScopeVo.findAll({where: {userId: user.userId}}).then((scopes) => {
      user.scope = [].concat(scopes.map((s) => s.scopeId));
      return Promise.resolve(user);
    });
  });
}

function _getUserScopeById (userId) {
  return userScopeVo.findAll({where: {userId}});
}

function _insertUser (users, trans) {
  if (!Array.isArray(users)) {
    users = [users];
  }
  return userVo.bulkCreate(users, { transaction: trans, returning: true }).then((array) => {
    return Promise.map(array, (user) => {
      let obj = {};
      for (let key in user.dataValues) {
        if (mapper[key]) {
          obj[mapper[key]] = user.dataValues[key];
        } else if (key === 'userId') {
          obj[key] = user.dataValues[key];
        }
      }
      return obj;
    });
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
    return userScopeVo.destroy({ where: {userId: user.userId}, transaction: trans }).then(function (c) {
      return userScopeVo.bulkCreate(array, { transaction: trans });
    });
  });
}

function _updateUserScopeById (userId, scopeList, trans) {
  let array = [];
  for (let idx = 0; idx < scopeList.length; idx++) {
    array.push({userId: userId, scopeId: scopeList[idx]});
  }
  return userScopeVo.destroy({ where: {userId}, transaction: trans }).then((c) => {
    return userScopeVo.bulkCreate(array, { transaction: trans });
  });
}

function _deleteUserById (userId, trans) {
  return userVo.destroy({ where: { userId }, transaction: trans }).then((c) => {
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
  /* getWholeByUserName: _getWholeByUserName,
  getProjectByUserName: _getProjectByUserName,
  getScadaByUserName: _getScadaByUserName,
  getDeviceByUserName: _getDeviceByUserName, */
  insertUser: _insertUser,
  insertUserScopeById: _insertUserScopeById,
  updateUserByName: _updateUserByName,
  updateUserScopeByName: _updateUserScopeByName,
  updateUserScopeById: _updateUserScopeById,
  deleteUserById: _deleteUserById,
  deleteUserScope: _deleteUserScope,
  deleteUserAllowDeviceById: _deleteUserAllowDeviceById
};
