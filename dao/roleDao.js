'use strict';

const Promise = require('bluebird');

var roleVo = null;
var roleScopeVo = null;
var mapper = {};

function _init (sequelize) {
  roleVo = sequelize.import('../models/roleVo');
  roleScopeVo = sequelize.import('../models/roleScopeVo');
  for (let key in roleVo.attributes) {
    mapper[roleVo.attributes[key].field] = key;
  }
}

function _getRoleList () {
  return roleVo.findAll({}).then((roles) => {
    if (roles.length > 0) {
      roles = roles.map((role) => Object.assign(role.dataValues, {scope: []}));
      return roleScopeVo.findAll({}).then((scopes) => {
        for (let scope of scopes) {
          roles.find((role) => role.roleId === scope.roleId).scope.push(scope.scopeId);
        }
        return Promise.resolve(roles);
      });
    } else {
      return Promise.resolve(roles);
    }
  });
}

function _getRole (roleId) {
  return roleVo.findOne({where: {roleId}}).then((role) => {
    if (role) {
      role = role.dataValues;
      return roleScopeVo.findAll({where: {roleId}}).then((scopes) => {
        role.scope = [].concat(scopes.map((s) => s.scopeId));
        return Promise.resolve(role);
      });
    } else {
      return Promise.resolve(role);
    }
  });
}

function _insertRole (roles, trans) {
  if (Array.isArray(roles)) {
    return roleVo.bulkCreate(roles, {transaction: trans}).then((array) => {
      return Promise.map(array, (role) => {
        let obj = {};
        for (let key in role.dataValues) {
          if (mapper[key]) {
            obj[mapper[key]] = role.dataValues[key];
          }
        }
        return obj;
      });
    });
  } else {
    return roleVo.create(roles, { transaction: trans });
  }
}

function _insertRoleScope (roleId, scopeList, trans) {
  let array = [];
  for (let idx = 0; idx < scopeList.length; idx++) {
    array.push({ roleId: roleId, scopeId: scopeList[idx] });
  }
  return roleScopeVo.bulkCreate(array, { transaction: trans });
}

function _updateRole (roleId, roleObj, trans) {
  return roleVo.update(roleObj, { where: {roleId}, transaction: trans });
}

function _updateRoleScope (roleId, scopeList, trans) {
  let array = [];
  for (let idx = 0; idx < scopeList.length; idx++) {
    array.push({roleId: roleId, scopeId: scopeList[idx]});
  }
  return roleScopeVo.destroy({ where: {roleId}, transaction: trans }).then(function (c) {
    return roleScopeVo.bulkCreate(array, { transaction: trans });
  });
}

function _deleteRole (roleId, trans) {
  return roleVo.destroy({ where: { roleId }, transaction: trans }).then(function (c) {
    return roleScopeVo.destroy({ where: {roleId}, transaction: trans });
  });
}

function _deleteRoleScope (roleId, trans) {
  return roleScopeVo.destroy({ where: {roleId}, transaction: trans });
}

module.exports = {
  init: _init,
  getRoleList: _getRoleList,
  getRole: _getRole,
  insertRole: _insertRole,
  insertRoleScope: _insertRoleScope,
  updateRole: _updateRole,
  updateRoleScope: _updateRoleScope,
  deleteRole: _deleteRole,
  deleteRoleScope: _deleteRoleScope
};
