'use strict';

var scopeVo = null;
var mapper = {};

function _init (sequelize) {
  scopeVo = sequelize.import('../models/scopeVo');
  for (let key in scopeVo.attributes) {
    mapper[scopeVo.attributes[key].field] = key;
  }
}

function _getScopeList () {
  return scopeVo.findAll({order: ['scope_id']});
}

function _getScope (scopeId) {
  return scopeVo.findOne({ where: {scopeId} });
}

function _insertScope (scopes, trans) {
  if (!Array.isArray(scopes)) {
    scopes = [scopes];
  }
  return scopeVo.bulkCreate(scopes, {transaction: trans}).then((array) => {
    return Promise.map(array, (scope) => {
      let obj = {};
      for (let key in scope.dataValues) {
        if (mapper[key]) {
          obj[mapper[key]] = scope.dataValues[key];
        }
      }
      return obj;
    });
  });
}

function _updateScope (scopeId, scopeObj, trans) {
  return scopeVo.update(scopeObj, { where: { scopeId }, transaction: trans });
}

function _deleteScope (scopeId, trans) {
  return scopeVo.destroy({ where: { scopeId }, transaction: trans });
}

module.exports = {
  init: _init,
  getScopeList: _getScopeList,
  getScope: _getScope,
  insertScope: _insertScope,
  updateScope: _updateScope,
  deleteScope: _deleteScope
};
