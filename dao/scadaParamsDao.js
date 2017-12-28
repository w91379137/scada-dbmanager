'use strict';

var scadaParamsVo = null;
// var _sequelize = null;

function _init (sequelize) {
  scadaParamsVo = sequelize.import('../models/scadaParamsVo');
  // _sequelize = sequelize;
}

function _getParamsByScadaId (scadaId) {
  return scadaParamsVo.findAll({where: {scadaId}});
}

function _insertParams (insertArray, trans) {
  return scadaParamsVo.bulkCreate(insertArray, { transaction: trans });
}

module.exports = {
  init: _init,
  getParamsByScadaId: _getParamsByScadaId,
  insertParams: _insertParams
};
