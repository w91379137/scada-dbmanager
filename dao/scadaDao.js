'use strict';

const Promise = require('bluebird');

var scadaVo = null;

function _init(sequelize){
    scadaVo = sequelize.import('../models/scadaVo');
}

function _getScadaList () {
    return scadaVo.findAll();
  }

function _getScada (scadaId) {
    return scadaVo.findOne({ where: { scadaId } });
  }

function _insertScada (scada, trans) {
    return scadaVo.create(scada, { transaction: trans });
  }

function _updateScada (scada, scadaId, trans) {
    return scadaVo.update(scada, { where: { scadaId } }, { transaction: trans }
    );
  }

function _deleteScada (scadaId, trans) {
    return scadaVo.destroy({ where: { scadaId } }, { transaction: trans });
  }

module.exports = {
  init: _init,
  getScadaList: _getScadaList,
  getScada: _getScada,
  insertScada: _insertScada,
  updateScada: _updateScada,
  deleteScada: _deleteScada
}

/* const BaseDao = require('./baseDao.js');

class ScadaDao extends BaseDao {
  constructor (sequelize) {
    super(sequelize);

    this.scadaVo = sequelize.import('../models/scadaVo');
  }

  getScadaList () {
    return this.scadaVo.findAll();
  }

  getScada (scadaId) {
    return this.scadaVo.findOne({ where: { scadaId } });
  }

  insertScada (scada, trans) {
    return this.scadaVo.create(scada, { transaction: trans });
  }

  updateScada (scada, scadaId, trans) {
    return this.scadaVo.update(scada, { where: { scadaId } }, { transaction: trans }
    );
  }

  deleteScada (scadaId, trans) {
    return this.scadaVo.destroy({ where: { scadaId } }, { transaction: trans });
  }
}

module.exports = ScadaDao; */
