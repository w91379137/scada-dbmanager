'use strict';

const Promise = require('bluebird');
var squel = require('squel').useFlavour('postgres');

var userAllowDeviceVo = null;
var structModelVo = null;
var _sequelize = null;

function _init (sequelize) {
  userAllowDeviceVo = sequelize.import('../models/userAllowDeviceVo');
  structModelVo = sequelize.import('../models/structModelVo');
  _sequelize = sequelize;
}

function _getAccessRight (filterObj = {}) {
  let sql = squel.select().from('scada.user_allow_device', 'UserAllowDevice')
  .field('UserAllowDevice.proj_id', 'projectId')
  .field('UserAllowDevice.scada_id', 'scadaId')
  .field('UserAllowDevice.device_id', 'deviceId')
  .field('UserAllowDevice.user_id', 'userId');
  if (filterObj.detail) {
    sql.field('Scada.scada_name', 'scadaName')
    .field('Device.device_name', 'deviceName')
    .left_join('scada.scada_list', 'Scada', squel.expr().and('Scada.scada_id = UserAllowDevice.scada_id'))
    .left_join('scada.device_list', 'Device', squel.expr().and('Device.device_id = UserAllowDevice.device_id'));
  }
  if (filterObj.userId) {
    sql.where('UserAllowDevice.user_id = ?', filterObj.userId);
  } else if (filterObj.userName) {
    sql.join('scada.user_info', 'UserInfo', squel.expr().and('UserInfo.user_id = UserAllowDevice.user_id'))
    .where('UserInfo.user_name = ?', filterObj.userName);
  }
  if (filterObj.projectId) {
    sql.where('UserAllowDevice.proj_id = ?', filterObj.projectId);
  }
  if (filterObj.scadaId) {
    sql.where('UserAllowDevice.scada_id = ?', filterObj.scadaId);
  }
  if (filterObj.deviceId) {
    sql.where('UserAllowDevice.device_id = ?', filterObj.deviceId);
  }

  return new Promise((resolve, reject) => {
    _sequelize.query(sql.toString(), { type: _sequelize.QueryTypes.SELECT, model: structModelVo }).then((raws) => {
      resolve(raws);
    }).catch((err) => {
      reject(err);
    });
  });
}

function _insertAccessRight (rights = [], trans) {
  let promises = [];
  for (let idx in rights) {
    let obj = rights[idx];
    promises.push(userAllowDeviceVo.findOrCreate({where: obj, defaults: obj, transaction: trans}));
  }
  return Promise.all(promises);
}

module.exports = {
  init: _init,
  getAccessRight: _getAccessRight,
  insertAccessRight: _insertAccessRight
};
