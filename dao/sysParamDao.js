'use strict';

const Promise = require('bluebird');

var sysParamVo = null;

function _init (sequelize) {
  sysParamVo = sequelize.import('../models/sysParamVo');
}

function _insertParam (raws, trans) {
  if (!Array.isArray(raws)) {
    raws = [raws];
  }
  let promises = [];
  for (let raw of raws) {
    promises.push(sysParamVo.create(raw, {transaction: trans}));
  }
  return Promise.all(promises);
}

function _getSRPInfo () {
  return sysParamVo.findAll({ where: { $or: [{ key: 'SRP_ID' }, { key: 'SRP_SECRET' }] } });
}

function _deleteSRPInfo (trans) {
  return sysParamVo.destroy({ where: { $or: [{ key: 'SRP_ID' }, { key: 'SRP_SECRET' }] }, transaction: trans });
}

module.exports = {
  init: _init,
  insertParam: _insertParam,
  getSRPInfo: _getSRPInfo,
  deleteSRPInfo: _deleteSRPInfo
};
