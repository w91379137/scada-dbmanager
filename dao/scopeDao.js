'use strict';

var scopeVo = null;

function _init (sequelize) {
  scopeVo = sequelize.import('../models/scopeVo');
}

function _getScopeList () {
  return scopeVo.findAll();
}

function _getScope (scopeId) {
  return scopeVo.findOne({ where: {scopeId} });
}

function _insertScope (scopeObj, trans) {
  return scopeVo.create(scopeObj, { transaction: trans });
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
