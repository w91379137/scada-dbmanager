'use strict';

const Promise = require('bluebird');
const Utils = require('../common/utils');
var squel = require('squel').useFlavour('postgres');

var scadaVo = null;
var userAllowDeviceVo = null;
var deviceVo = null;
var structModelVo = null;
var tagDao = require('./tagDao');
var _sequelize = null;
var mapper = {};

function _init (sequelize) {
  scadaVo = sequelize.import('../models/scadaVo');
  deviceVo = sequelize.import('../models/deviceVo');
  userAllowDeviceVo = sequelize.import('../models/userAllowDeviceVo');
  structModelVo = sequelize.import('../models/structModelVo');
  _sequelize = sequelize;
  for (let key in scadaVo.attributes) {
    mapper[scadaVo.attributes[key].field] = key;
  }
}

/**
 * @param {Object} filterObj
 * @param {Integer} filterObj.offset: starting index
 * @param {Integer} filterObj.limit: data retrived
 * @param {String} filterObj.scadaName: filter scada name
 * @param {String} filterObj.description: filter scada desc
 * @param {String} filterObj.sortby: sort properties
 * @param {String} filterObj.order: order asc or not
 * @param {Boolean} filterObj.detail: select id & name only
 * @param {String} filterObj.userName: filter the scadas that userName can access
 *  }
 */
function _getScadaList (filterObj = {}) {
  let offset = filterObj.offset ? filterObj.offset : 0;
  let limit = filterObj.limit ? filterObj.limit : null;
  let sortby = filterObj.sortby ? filterObj.sortby : 'scadaId';
  let order = filterObj.order !== null ? filterObj.order : true;
  let detail = filterObj.detail ? filterObj.detail : false;

  let sql = squel.select().from('scada.scada_list', 'Scada');
  if (detail) {
    for (let idx in scadaVo.attributes) {
      sql.field('Scada.' + scadaVo.attributes[idx].field, idx);
    }
  } else {
    sql.field('Scada.proj_id', 'projectId');
    sql.field('Scada.scada_id', 'scadaId');
    sql.field('Scada.scada_name', 'scadaName');
  }
  sql.distinct();
  if (filterObj.userName) {
    sql.join('scada.user_allow_device', 'UserAllowDevice', squel.expr().and('Scada.proj_id = UserAllowDevice.proj_id').and('Scada.scada_id = UserAllowDevice.scada_id'));
    sql.join('scada.user_info', 'UserInfo', squel.expr().and('UserAllowDevice.user_id = UserInfo.user_id'));
    sql.where('Userinfo.user_name = ? ', filterObj.userName);
  }
  for (let idx in scadaVo.attributes) {
    let key = scadaVo.attributes[idx];
    if (!Utils.isNullOrUndefined(filterObj[idx])) {
      sql.where('Scada.' + key.field + ' LIKE ?', filterObj[idx]);
    }
  }
  sql.order(sortby, order);
  return new Promise((resolve, reject) => {
    _sequelize.query(sql.toString(), { type: _sequelize.QueryTypes.SELECT, model: scadaVo }).then((raws) => {
      resolve({count: raws.length, rows: raws.slice(offset, limit ? limit + offset : raws.length)});
    }).catch((err) => {
      reject(err);
    });
  });
}

/**
 * @param {String} projectId
 * @param {Object} filterObj
 * @param {Integer} filterObj.offset: starting index
 * @param {Integer} filterObj.limit: data retrived
* @param {String} filterObj.scadaName: filter scada name
 * @param {String} filterObj.description: filter scada desc
 * @param {String} filterObj.sortby: sort properties
 * @param {String} filterObj.order: order asc or not
 * @param {Boolean} filterObj.detail: select id & name only
 * @param {String} filterObj.userName: filter the scadas that userName can access
 *  }
 */
function _getScadaListByProjectId (projectId, filterObj = {}) {
  let offset = filterObj.offset ? filterObj.offset : 0;
  let limit = filterObj.limit ? filterObj.limit : null;
  let sortby = filterObj.sortby ? filterObj.sortby : 'scadaId';
  let order = filterObj.order !== null ? filterObj.order : true;
  let detail = filterObj.detail ? filterObj.detail : false;

  let sql = squel.select().from('scada.scada_list', 'Scada');
  if (detail) {
    for (let idx in scadaVo.attributes) {
      sql.field('Scada.' + scadaVo.attributes[idx].field, idx);
    }
  } else {
    sql.field('Scada.proj_id', 'projectId');
    sql.field('Scada.scada_id', 'scadaId');
    sql.field('Scada.scada_name', 'scadaName');
  }
  sql.distinct();
  if (filterObj.userName) {
    sql.join('scada.user_allow_device', 'UserAllowDevice', squel.expr().and('Scada.proj_id = UserAllowDevice.proj_id').and('Scada.scada_id = UserAllowDevice.scada_id'));
    sql.join('scada.user_info', 'UserInfo', squel.expr().and('UserAllowDevice.user_id = UserInfo.user_id'));
    sql.where('Userinfo.user_name = ?', filterObj.userName);
  }
  sql.where('Scada.proj_id = ? ', projectId);

  for (let idx in scadaVo.attributes) {
    let key = scadaVo.attributes[idx];
    if (!Utils.isNullOrUndefined(filterObj[idx])) {
      sql.where('Scada.' + key.field + ' LIKE ?', filterObj[idx]);
    }
  }
  sql.order(sortby, order);
  return new Promise((resolve, reject) => {
    _sequelize.query(sql.toString(), { type: _sequelize.QueryTypes.SELECT, model: scadaVo }).then((raws) => {
      resolve({count: raws.length, rows: raws.slice(offset, limit ? limit + offset : raws.length)});
    }).catch((err) => {
      reject(err);
    });
  });
}

function _getScada (scadaId) {
  return scadaVo.findOne({ where: { scadaId } });
}

function _insertScada (scadas, trans) {
  if (!Array.isArray(scadas)) {
    scadas = [scadas];
  }
  return scadaVo.bulkCreate(scadas, {transaction: trans}).then((array) => {
    return Promise.map(array, (scada) => {
      let obj = {};
      for (let key in scada.dataValues) {
        if (mapper[key]) {
          obj[mapper[key]] = scada.dataValues[key];
        }
      }
      return obj;
    });
  });
}

function _updateScada (scadaId, scada, trans) {
  return scadaVo.update(scada, { where: { scadaId }, transaction: trans });
}

function _deleteScada (scadaId, trans) {
  let promises = [];
  promises.push(scadaVo.destroy({ where: { scadaId }, transaction: trans }));
  promises.push(deviceVo.destroy({ where: { scadaId }, transaction: trans }));
  promises.push(tagDao.deleteTagListByScadaId(scadaId, trans));
  promises.push(userAllowDeviceVo.destroy({ where: { scadaId }, transaction: trans }));
  return Promise.all(promises);
}

/* function _unbindScadas (scadaIds = [], trans) {
  let promises = [];
  for (let idx in scadaIds) {
    promises.push(scadaVo.update({projectId: null}, {where: {scadaId: scadaIds[idx]}}, { transaction: trans }));
  }
  return Promise.all(promises);
} */

/**
 *
 * @param {Array} array: Object of Array
 * @param {String} array[idx].projectId: project Id
 * @param {String} array[idx].scadaId: scada Id
 * @param {*} trans
 */
function _bindScadas (array = [], trans) {
  let data = [];
  for (let idx in array) {
    let sql = squel.update()
      .table('scada.scada_list')
      .set('proj_id', array[idx].projectId)
      .where('scada_id = ?', array[idx].scadaId)
      .toString();
    data.push(sql);
    sql = squel.update()
      .table('scada.user_allow_device', 't')
      .set('proj_id', array[idx].projectId)
      .where(squel.str('EXISTS(?)', squel.select().from('scada.user_allow_device', 'o').where('o.proj_id = ?', array[idx].projectId).where('o.user_id = t.user_id')))
      .where('scada_id = ?', array[idx].scadaId)
      .toString();
    data.push(sql);
    sql = squel.delete()
      .from('scada.user_allow_device', 't')
      .where('scada_id = ? AND proj_id <> ?', array[0].scadaId, array[0].projectId)
      .toString();
    data.push(sql);
  }
  return Promise.mapSeries(data, (sql) => {
    return _sequelize.query(sql, {transaction: trans});
  });
}

function _checkScadaRightByUserName (userName, filterObj = {}) {
  let sql = squel.select().from('scada.scada_list', 'Scada');
  sql.field('Scada.proj_id', 'projectId');
  sql.field('Scada.scada_id', 'scadaId');
  sql.field('Scada.config_uploaded', 'configUploaded');
  sql.field('SUB.userId', 'userId');
  sql.distinct();
  sql.left_join(squel.select().from('scada.user_allow_device', 'UserAllowDevice')
  .field('UserAllowDevice.user_id', 'userId').field('UserAllowDevice.scada_id', 'scadaId')
  .join('scada.user_info', 'UserInfo', squel.expr().and('UserAllowDevice.user_id = UserInfo.user_id').and('Userinfo.user_name = ?', userName)), 'SUB', 'SUB.scadaId = Scada.scada_id');
  /* if (filterObj.projectId) {
    sql.where(('UserAllowDevice.proj_id = ?', filterObj.projectId));
  }
  if (filterObj.scadaId) {
    sql.where(('UserAllowDevice.scada_id = ?', filterObj.scadaId));
  }
  if (filterObj.deviceId) {
    sql.where(('UserAllowDevice.device_id = ?', filterObj.deviceId));
  } */
  return new Promise((resolve, reject) => {
    _sequelize.query(sql.toString(), { type: _sequelize.QueryTypes.SELECT, model: structModelVo }).then((raws) => {
      resolve(raws);
    }).catch((err) => {
      reject(err);
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
  /* unbindScadas: _unbindScadas, */
  bindScadas: _bindScadas,
  checkScadaRightByUserName: _checkScadaRightByUserName
};
