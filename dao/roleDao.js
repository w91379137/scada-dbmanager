'use strict';

const Promise = require('bluebird');

var roleVo = null;
var roleScopeVo = null;
var scopeVo = null;

function _init (sequelize) {
  roleVo = sequelize.import('../models/roleVo');
  roleScopeVo = sequelize.import('../models/roleScopeVo');
  scopeVo = sequelize.import('../models/scopeVo');
}

function _insertRole (roleObj, trans) {
  let roleId = roleObj.roleId;
  return new Promise((resolve, reject) => {
    roleVo.findOne({where: {roleId}}).then(function (role) {
      if (role) {
        return reject(new Error(roleId + ' is exist'));
      }
      resolve(roleVo.create(roleObj, { transaction: trans }));
    }).catch(function (err) {
      reject(err);
    });
  });
}

function _insertRoleScope (roleId, scopeList, trans) {
  let array = [];
  return new Promise((resolve, reject) => {
    scopeVo.findAll().then(function (scopes) {
      scopes = scopes.map((o) => o.scopeId);
      for (let idx = 0; idx < scopeList.length; idx++) {
        if (scopes.indexOf(scopeList[idx]) === -1) {
          return reject(new Error(scopeList[idx] + ' is not exist'));
        }
        if (array.indexOf(scopeList[idx]) === -1) {
          array.push({ roleId: roleId, scopeId: scopeList[idx] });
        }
      }
      resolve(roleScopeVo.bulkCreate(array, { transaction: trans }));
    }).catch(function (err) {
      reject(err);
    });
  });
}

function _updateRole (roleId, roleObj, trans) {
  return new Promise((resolve, reject) => {
    roleVo.update(roleObj, {where: {roleId}}, { transaction: trans }).then(function (c) {
      if (c === 0) {
        reject(new Error('userName is not exist'));
      }
      resolve(true);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function _updateRoleScope (roleId, scopeList, trans) {
  return new Promise((resolve, reject) => {
    roleVo.findOne({where: {roleId}}).then(function (user) {
      let array = [];
      scopeVo.findAll().then(function (scopes) {
        scopes = scopes.map((o) => o.scopeId);
        for (let idx in scopeList) {
          if (scopes.indexOf(scopeList[idx]) === -1) {
            reject(new Error(scopeList[idx] + ' is not exist'));
          }
          if (array.indexOf(scopeList[idx]) === -1) {
            array.push({roleId: roleId, scopeId: scopeList[idx]});
          }
        }
        roleScopeVo.destroy({where: {roleId}}, { transaction: trans }).then(function (c) {
          if (array.length === 0) {
            resolve(true);
          }
          resolve(roleScopeVo.bulkCreate(array, { transaction: trans }));
        });
      });
    });
  });
}

function _deleteRole (roleId, trans) {
  return roleVo.destroy({ where: { roleId } }, { transaction: trans }).then(function (c) {
    return roleScopeVo.destroy({ where: {roleId} }, { transaction: trans });
  });
}

function _deleteRoleScope (roleId, trans) {
  return roleScopeVo.destroy({ where: {roleId} }, { transaction: trans });
}

module.exports = {
  init: _init,
  insertRole: _insertRole,
  insertRoleScope: _insertRoleScope,
  updateRole: _updateRole,
  updateRoleScope: _updateRoleScope,
  deleteRole: _deleteRole,
  deleteRoleScope: _deleteRoleScope
};
