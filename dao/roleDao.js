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
  return roleVo.create(roleObj, { transaction: trans });
}

function _insertRoleScope (roleId, scopeList, trans) {
  let array = [];
  for (let idx = 0; idx < scopeList.length; idx++) {
    array.push({ roleId: roleId, scopeId: scopeList[idx] });
  }
  return roleScopeVo.bulkCreate(array, { transaction: trans });
}

function _updateRole (roleId, roleObj, trans) {
  return roleVo.update(roleObj, {where: {roleId}}, { transaction: trans });
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
  insertRole: _insertRole,
  insertRoleScope: _insertRoleScope,
  updateRole: _updateRole,
  updateRoleScope: _updateRoleScope,
  deleteRole: _deleteRole,
  deleteRoleScope: _deleteRoleScope
};
