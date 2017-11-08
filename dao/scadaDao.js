'use strict';

const Sequelize = require('sequelize');
const Utils = require('../common/utils');

var scadaVo = null;

function _init (sequelize) {
  scadaVo = sequelize.import('../models/scadaVo');
}

function _getScadaList () {
  return scadaVo.findAll();
}

/**
 * @param {String} projectId: projectId
 * @param {Object} params
 * @param {Integer} params.offset: starting index
 * @param {Integer} params.limit: data retrived
 * @param {String} params.scadaName: filter project name
 * @param {String} params.scadaDesc: filter project desc
 * @param {String} params.sortby: sort properties
 * @param {String} params.order: order asc or desc
 */
function _getScadaListByProjectId (projectId, params) {
  let props = Object.keys(scadaVo.attributes);
  let where = { projectId };
  for (let idx in props) {
    let key = props[idx];
    if (!Utils.isNullOrUndefined(params[key])) {
      where[key] = { $like: params[key] };
    }
  }
  let filter = {};
  filter.offset = !Utils.isNullOrUndefined(params.offset) ? params.offset : null;
  filter.limit = !Utils.isNullOrUndefined(params.limit) ? params.limit : null;
  filter.order = !Utils.isNullOrUndefined(params.sortby) && !Utils.isNullOrUndefined(params.order) ? Sequelize.literal(params.sortby + ' ' + params.order) : null;
  filter.where = where;
  return scadaVo.findAndCountAll(filter);
}

function _getScada (projectId, scadaId) {
  return scadaVo.findOne({ where: { projectId, scadaId } });
}

function _insertScada (scada, trans) {
  return scadaVo.create(scada, { transaction: trans });
}

function _updateScada (scada, scadaId, trans) {
  return scadaVo.update(scada, { where: { scadaId } }, { transaction: trans });
}

function _deleteScada (scadaId, trans) {
  return scadaVo.destroy({ where: { scadaId } }, { transaction: trans });
}

module.exports = {
  init: _init,
  getScadaList: _getScadaList,
  getScadaListByProjectId: _getScadaListByProjectId,
  getScada: _getScada,
  insertScada: _insertScada,
  updateScada: _updateScada,
  deleteScada: _deleteScada
};

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
