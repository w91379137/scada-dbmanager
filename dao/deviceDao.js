'use strict';

const Promise = require('bluebird');
const Utils = require('../common/utils');
var squel = require('squel').useFlavour('postgres');

var deviceVo = null;
var userAllowDeviceVo = null;
var tagDao = require('./tagDao');
var _sequelize = null;
let mapper = {};

function _init (sequelize) {
  deviceVo = sequelize.import('../models/deviceVo');
  userAllowDeviceVo = sequelize.import('../models/userAllowDeviceVo');
  _sequelize = sequelize;
  for (let key in deviceVo.attributes) {
    mapper[deviceVo.attributes[key].field] = key;
  }
}

function _getDevice (scadaId, deviceId) {
  return deviceVo.findOne({where: { scadaId, deviceId }});
}

/**
 * @param {Object} filterObj
 * @param {Number} filterObj.offset: starting index
 * @param {Number} filterObj.limit: data retrived
 * @param {String} filterObj.deviceName: filter device name
 * @param {String} filterObj.description: filter device desc
 * @param {String} filterObj.sortby: sort properties
 * @param {String} filterObj.order: order asc or not
 * @param {Boolean} filterObj.detail: select id & name only
 * @param {String} filterObj.userName: filter the devices that userName can access
 * @param {Boolean} filterObj.projectId: show projectId or not
 *  }
 */
function _getDeviceList (filterObj = {}) {
  let offset = filterObj.offset ? filterObj.offset : 0;
  let limit = filterObj.limit ? filterObj.limit : null;
  let sortby = filterObj.sortby ? filterObj.sortby : 'deviceId';
  let order = filterObj.order !== null ? filterObj.order : true;
  let detail = filterObj.detail ? filterObj.detail : false;
  let projectId = filterObj.projectId ? filterObj.projectId : false;

  let sql = squel.select().from('scada.device_list', 'Device');
  if (detail) {
    for (let idx in deviceVo.attributes) {
      sql.field('Device.' + deviceVo.attributes[idx].field, idx);
    }
  } else {
    sql.field('Device.scada_id', 'scadaId');
    sql.field('Device.device_id', 'deviceId');
    sql.field('Device.device_name', 'deviceName');
  }
  if (projectId) {
    sql.field('Scada.proj_id');
    sql.join('scada.scada_list', 'Scada', squel.expr().and('Device.scada_id = Scada.scada_id'));
  }
  sql.distinct();
  if (filterObj.userName) {
    sql.join('scada.user_allow_device', 'UserAllowDevice', squel.expr().and('Device.scada_id = UserAllowDevice.scada_id').and('Device.device_id = UserAllowDevice.device_id'));
    sql.join('scada.user_info', 'UserInfo', squel.expr().and('UserAllowDevice.user_id = UserInfo.user_id'));
    sql.where('Userinfo.user_name = ? ', filterObj.userName);
  }
  for (let idx in deviceVo.attributes) {
    let key = deviceVo.attributes[idx];
    if (!Utils.isNullOrUndefined(filterObj[idx])) {
      sql.where('Device.' + key.field + ' LIKE ?', filterObj[idx]);
    }
  }
  sql.order(sortby, order);
  return new Promise((resolve, reject) => {
    _sequelize.query(sql.toString(), { type: _sequelize.QueryTypes.SELECT, model: deviceVo }).then((raws) => {
      if (projectId) {
        let res = [];
        for (let idx = 0; idx < raws.length; idx++) {
          let o = Object.assign({projectId: raws[idx].dataValues.proj_id}, raws[idx].dataValues);
          delete o.proj_id;
          res.push(o);
        }
        raws = res;
      }
      resolve({count: raws.length, rows: raws.slice(offset, limit ? limit + offset : raws.length)});
    }).catch((err) => {
      reject(err);
    });
  });
}

/**
 * @param {String} projectId
 * @param {Object} filterObj
 * @param {Number} filterObj.offset: starting index
 * @param {Number} filterObj.limit: data retrived
 * @param {String} filterObj.deviceName: filter device name
 * @param {String} filterObj.description: filter device desc
 * @param {String} filterObj.sortby: sort properties
 * @param {String} filterObj.order: order asc or not
 * @param {Boolean} filterObj.detail: select id & name only
 * @param {String} filterObj.userName: filter the devices that userName can access
 *  }
 */
function _getDeviceListByProjectId (projectId, filterObj = {}) {
  let offset = filterObj.offset ? filterObj.offset : 0;
  let limit = filterObj.limit ? filterObj.limit : null;
  let sortby = filterObj.sortby ? filterObj.sortby : 'deviceId';
  let order = filterObj.order !== null ? filterObj.order : true;
  let detail = filterObj.detail ? filterObj.detail : false;

  let sql = squel.select().from('scada.device_list', 'Device');
  if (detail) {
    for (let idx in deviceVo.attributes) {
      sql.field('Device.' + deviceVo.attributes[idx].field, idx);
    }
  } else {
    sql.field('Device.scada_id', 'scadaId');
    sql.field('Device.device_id', 'deviceId');
    sql.field('Device.device_name', 'deviceName');
  }
  sql.distinct();
  sql.join('scada.scada_list', 'Scada', squel.expr().and('Device.scada_id = Scada.scada_id'));
  if (filterObj.userName) {
    sql.join('scada.user_allow_device', 'UserAllowDevice', squel.expr().and('Device.scada_id = UserAllowDevice.scada_id').and('Device.device_id = UserAllowDevice.device_id'));
    sql.join('scada.user_info', 'UserInfo', squel.expr().and('UserAllowDevice.user_id = UserInfo.user_id'));
    sql.where('Userinfo.user_name = ?', filterObj.userName);
  }
  sql.where('Scada.proj_id = ? ', projectId);
  for (let idx in deviceVo.attributes) {
    let key = deviceVo.attributes[idx];
    if (!Utils.isNullOrUndefined(filterObj[idx])) {
      sql.where('Device.' + key.field + ' LIKE ?', filterObj[idx]);
    }
  }
  sql.order(sortby, order);
  return new Promise((resolve, reject) => {
    _sequelize.query(sql.toString(), { type: _sequelize.QueryTypes.SELECT, model: deviceVo }).then((raws) => {
      resolve({count: raws.length, rows: raws.slice(offset, limit ? limit + offset : raws.length)});
    }).catch((err) => {
      reject(err);
    });
  });
}

/**
 * @param {String} scadaId
 * @param {Object} filterObj
 * @param {Number} filterObj.offset: starting index
 * @param {Number} filterObj.limit: data retrived
 * @param {String} filterObj.deviceName: filter device name
 * @param {String} filterObj.description: filter device desc
 * @param {String} filterObj.sortby: sort properties
 * @param {String} filterObj.order: order asc or not
 * @param {Boolean} filterObj.detail: select id & name only
 * @param {String} filterObj.userName: filter the devices that userName can access
 *  }
 */
function _getDeviceListByScadaId (scadaId, filterObj = {}) {
  let offset = filterObj.offset ? filterObj.offset : 0;
  let limit = filterObj.limit ? filterObj.limit : null;
  let sortby = filterObj.sortby ? filterObj.sortby : 'deviceId';
  let order = filterObj.order !== null ? filterObj.order : true;
  let detail = filterObj.detail ? filterObj.detail : false;

  let sql = squel.select().from('scada.device_list', 'Device');
  if (detail) {
    for (let idx in deviceVo.attributes) {
      sql.field('Device.' + deviceVo.attributes[idx].field, idx);
    }
  } else {
    sql.field('Device.scada_id', 'scadaId');
    sql.field('Device.device_id', 'deviceId');
    sql.field('Device.device_name', 'deviceName');
  }
  sql.distinct();
  if (filterObj.userName) {
    sql.join('scada.user_allow_device', 'UserAllowDevice', squel.expr().and('Device.scada_id = UserAllowDevice.scada_id').and('Device.device_id = UserAllowDevice.device_id'));
    sql.join('scada.user_info', 'UserInfo', squel.expr().and('UserAllowDevice.user_id = UserInfo.user_id'));
    sql.where('Userinfo.user_name = ?', filterObj.userName);
  }
  sql.where('Device.scada_id = ? ', scadaId);
  for (let idx in deviceVo.attributes) {
    let key = deviceVo.attributes[idx];
    if (!Utils.isNullOrUndefined(filterObj[idx])) {
      sql.where('Device.' + key.field + ' LIKE ?', filterObj[idx]);
    }
  }
  sql.order(sortby, order);
  return new Promise((resolve, reject) => {
    _sequelize.query(sql.toString(), { type: _sequelize.QueryTypes.SELECT, model: deviceVo }).then((raws) => {
      resolve({count: raws.length, rows: raws.slice(offset, limit ? limit + offset : raws.length)});
    }).catch((err) => {
      reject(err);
    });
  });
}

function _insertDevice (devices, t) {
  if (Array.isArray(devices)) {
    return deviceVo.bulkCreate(devices, { transaction: t }).then((array) => {
      return Promise.map(array, (device) => {
        let obj = {};
        for (let key in device.dataValues) {
          if (mapper[key]) {
            obj[mapper[key]] = device.dataValues[key];
          }
        }
        return obj;
      });
    });
  } else {
    return deviceVo.create(devices, { transaction: t });
  }
}

function _updateDevice (scadaId, deviceId, device, t) {
  return deviceVo.update(device, { where: { scadaId, deviceId }, transaction: t });
}

function _deleteDevice (scadaId, deviceId, t) {
  let promises = [];
  promises.push(deviceVo.destroy({ where: { scadaId, deviceId }, transaction: t }));
  promises.push(tagDao.deleteTagListByDeviceId(scadaId, deviceId, t));
  promises.push(userAllowDeviceVo.destroy({ where: { scadaId, deviceId }, transaction: t }));
  return Promise.all(promises);
}
function _deleteDeviceByScadaId (scadaId, t) {
  let promises = [];
  promises.push(deviceVo.destroy({ where: { scadaId }, transaction: t }));
  promises.push(tagDao.deleteTagListByScadaId(scadaId, t));
  promises.push(userAllowDeviceVo.destroy({ where: { scadaId, deviceId: { $ne: '' } }, transaction: t }));
  return Promise.all(promises);
}

function _checkDeviceRightByUserName (userName) {
  let sql = squel.select().from('scada.device_list', 'Device');
  sql.field('Scada.proj_id', 'projectId');
  sql.field('Device.scada_id', 'scadaId');
  sql.field('Device.device_id', 'deviceId');
  sql.field('SUB.userId', 'userId');
  sql.distinct();
  sql.join('scada.scada_list', 'Scada', squel.expr().and('Scada.scada_id = Device.scada_id'));
  sql.left_join(squel.select().from('scada.user_allow_device', 'UserAllowDevice')
  .field('UserAllowDevice.user_id', 'userId').field('UserAllowDevice.scada_id', 'scadaId').field('UserAllowDevice.device_id', 'deviceId').field('UserAllowDevice.proj_id', 'projectId')
  .join('scada.user_info', 'UserInfo', squel.expr().and('UserAllowDevice.user_id = UserInfo.user_id').and('Userinfo.user_name = ?', userName))
  , 'SUB', 'SUB.scadaId = Device.scada_id AND SUB.deviceId = Device.device_id');
  return new Promise((resolve, reject) => {
    _sequelize.query(sql.toString(), { type: _sequelize.QueryTypes.SELECT, model: userAllowDeviceVo }).then((raws) => {
      resolve(raws);
    }).catch((err) => {
      reject(err);
    });
  });
}

module.exports = {
  init: _init,
  getDeviceList: _getDeviceList,
  getDeviceListByProjectId: _getDeviceListByProjectId,
  getDeviceListByScadaId: _getDeviceListByScadaId,
  getDevice: _getDevice,
  insertDevice: _insertDevice,
  updateDevice: _updateDevice,
  deleteDeviceByScadaId: _deleteDeviceByScadaId,
  deleteDevice: _deleteDevice,
  checkDeviceRightByUserName: _checkDeviceRightByUserName
};
