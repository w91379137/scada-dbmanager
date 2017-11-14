'use strict';

const Promise = require('bluebird');
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

function _unbindScadas (scadaIds = [], trans) {
  let promises = [];
  for (let idx in scadaIds) {
    promises.push(scadaVo.update({projectId: null}, {where: {scadaId: scadaIds[idx]}}, { transaction: trans }));
  }
  return Promise.all(promises);
}

/**
 * 
 * @param {Array} array: Object of Array
 * @param {String} array[idx].projectId: project Id
 * @param {String} array[idx].scadaId: scada Id
 * @param {*} trans 
 */
function _bindScadas (array = [], trans) {
  let promises = [];
  for (let idx in array) {
    promises.push(scadaVo.update({projectId: array[idx].projectId}, {where: {scadaId: array[idx].scadaId}}, { transaction: trans }));
  }
  return Promise.all(promises);
}

function _isScadaIdsAllExist (scadaIds = [], trans) {
  let where = {scadaId: {$or: scadaIds}};
  return new Promise((resolve, reject) => {
    scadaVo.findAndCountAll({where: where}).then(function (res) {
      return resolve(res.count === scadaIds.length);
    }).catch(function (err) {
      return reject(err);
    });
  });
}

module.exports = {
  init: _init,
  getScadaList: _getScadaList,
  getScadaListByProjectId: _getScadaListByProjectId,
  getScada: _getScada,
  insertScada: _insertScada,
  updateScada: _updateScada,
  deleteScada: _deleteScada,
  unbindScadas: _unbindScadas,
  bindScadas: _bindScadas,
  isScadaIdsAllExist: _isScadaIdsAllExist
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
