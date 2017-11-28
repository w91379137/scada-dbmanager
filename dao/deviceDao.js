'use strict';

const Promise = require('bluebird');

var deviceVo = null;
var tagDao = require('./tagDao');

function _init (sequelize) {
  deviceVo = sequelize.import('../models/deviceVo');
}

function _getDevice (scadaId, deviceId) {
  return deviceVo.findOne({where: { scadaId, deviceId }});
}

function _getDeviceListByScadaId (scadaId) {
  return deviceVo.findAll({where: { scadaId }});
}

function _insertDevice (device, t) {
  return deviceVo.create(device, { transaction: t });
}

function _updateDevice (device, scadaId, deviceId, t) {
  return deviceVo.update(device, { where: { scadaId, deviceId } }, { transaction: t });
}

function _deleteDevice (scadaId, deviceId, t) {
  let promises = [];
  promises.push(deviceVo.destroy({ where: { scadaId, deviceId }, transaction: t }));
  promises.push(tagDao.deleteTagListByDeviceId(scadaId, deviceId, t));
  return Promise.all(promises);
}

function _deleteDeviceListByScadaId (scadaId, t) {
  return deviceVo.destroy({ where: { scadaId }, transaction: t });
}

module.exports = {
  init: _init,
  getDevice: _getDevice,
  getDeviceListByScadaId: _getDeviceListByScadaId,
  insertDevice: _insertDevice,
  updateDevice: _updateDevice,
  deleteDevice: _deleteDevice,
  deleteDeviceListByScadaId: _deleteDeviceListByScadaId
};
