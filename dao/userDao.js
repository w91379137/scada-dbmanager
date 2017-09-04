'use strict';

const Promise = require('bluebird');

var userVo = null;
var userScopeVo = null;
var scopeVo = null;

function _init (sequelize) {
  userVo = sequelize.import('../models/userVo');
  userScopeVo = sequelize.import('../models/userScopeVo');
  scopeVo = sequelize.import('../models/scopeVo');
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
  let userName = userObj.userName;
  return new Promise((resolve, reject) => {
    userVo.findOne({ where: {userName} }).then(function (obj) {
      if (obj) {
        return reject(new Error(userName + ' is exist'));
      }
      resolve(userVo.create(userObj, { transaction: trans }));
    }).catch(function (err) {
      reject(err);
    });
  });
}

function _insertUserScopeById (userId, scopeList, trans) {
  let array = [];
  return new Promise((resolve, reject) => {
    scopeVo.findAll().then(function (scopes) {
      scopes = scopes.map((o) => o.scopeId);
      for (let idx = 0; idx < scopeList.length; idx++) {
        if (scopes.indexOf(scopeList[idx]) === -1) {
          return reject(new Error(scopeList[idx] + ' is not exist'));
        }
        if (array.indexOf(scopeList[idx]) === -1) {
          array.push({ userId: userId, scopeId: scopeList[idx] });
        }
      }
      resolve(userScopeVo.bulkCreate(array, { transaction: trans }));
    }).catch(function (err) {
      reject(err);
    });
  });
}

function _updateUserByName (userName, userObj, trans) {
  return new Promise((resolve, reject) => {
    userVo.update(userObj, {where: {userName}}, { transaction: trans }).then(function (c) {
      if (c === 0) {
        reject(new Error('userName is not exist'));
      }
      resolve(true);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function _updateUserScopeByName (userName, scopeList, trans) {
  return new Promise((resolve, reject) => {
    userVo.findOne({where: {userName}}).then(function (user) {
      let array = [];
      scopeVo.findAll().then(function (scopes) {
        scopes = scopes.map((o) => o.scopeId);
        for (let idx in scopeList) {
          if (scopes.indexOf(scopeList[idx]) === -1) {
            reject(new Error(scopeList[idx] + ' is not exist'));
          }
          if (array.indexOf(scopeList[idx]) === -1) {
            array.push({userId: user.userId, scopeId: scopeList[idx]});
          }
        }
        userScopeVo.destroy({where: {userId: user.userId}}, { transaction: trans }).then(function (c) {
          if (array.length === 0) {
            resolve(true);
          }
          resolve(userScopeVo.bulkCreate(array, { transaction: trans }));
        });
      });
    });
  });
}

function _updateUserScopeById (userId, scopeList, trans) {
  return new Promise((resolve, reject) => {
    let array = [];
    scopeVo.findAll().then(function (scopes) {
      scopes = scopes.map((o) => o.scopeId);
      for (let idx in scopeList) {
        if (scopes.indexOf(scopeList[idx]) === -1) {
          reject(new Error(scopeList[idx] + ' is not exist'));
        }
        if (array.indexOf(scopeList[idx]) === -1) {
          array.push({userId: userId, scopeId: scopeList[idx]});
        }
      }
      userScopeVo.destroy({where: {userId}}, { transaction: trans }).then(function (c) {
        if (array.length === 0) {
          resolve(true);
        }
        resolve(userScopeVo.bulkCreate(array, { transaction: trans }));
      });
    });
  });
}

function _deleteUserById (userId, trans) {
  return userVo.destroy({ where: { userId } }, { transaction: trans }).then(function (c) {
    return userScopeVo.destroy({ where: {userId} }, { transaction: trans });
  });
}

function _deleteUserScope (userId, trans) {
  return userScopeVo.destroy({ where: {userId} }, { transaction: trans });
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
  deleteUserScope: _deleteUserScope
};
