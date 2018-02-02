'use strict';

const Promise = require('bluebird');

var sysParamVo = null;
var mapper = {};

function _init (sequelize) {
  sysParamVo = sequelize.import('../models/sysParamVo');
  for (let key in sysParamVo.attributes) {
    mapper[sysParamVo.attributes[key].field] = key;
  }
}

function _insertParam (raws, trans) {
  if (!Array.isArray(raws)) {
    raws = [raws];
  }
  return sysParamVo.bulkCreate(raws, { transaction: trans }).then((array) => {
    return Promise.map(array, (user) => {
      let obj = {};
      for (let key in user.dataValues) {
        if (mapper[key]) {
          obj[mapper[key]] = user.dataValues[key];
        }
      }
      return obj;
    });
  });
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
