'use strict';

const Promise = require('bluebird');

var deviceVo = null;

function _init(sequelize){
    deviceVo = sequelize.import('../models/deviceVo');
}

function _getDevice (scadaId, deviceId) {
    return deviceVo.findOne({
      where: { scadaId, deviceId }
    });
  }

function _getDeviceListByScadaId (scadaId) {
    return deviceVo.findAll({
      where: { scadaId }
    });
  }

function _insertDevice (device, t) {
    return deviceVo.create(device, { transaction: t });
  }

function _updateDevice (device, scadaId, deviceId, t) {
    return deviceVo.update(
      device, { where: { scadaId, deviceId } }, { transaction: t });
  }

function _deleteDevice (scadaId, deviceId, t) {
    return deviceVo.destroy({
      where: { scadaId, deviceId }
    }, { transaction: t });
  }

function _deleteDeviceListByScadaId (scadaId, t) {
    return deviceVo.destroy({
      where: { scadaId }
    }, { transaction: t });
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


/* const BaseDao = require('./baseDao.js');

class DeviceDao extends BaseDao {
  constructor (sequelize) {
    super(sequelize);

    this.deviceVo = sequelize.import('../models/deviceVo');
  }

  getDevice (scadaId, deviceId) {
    return this.deviceVo.findOne({
      where: { scadaId, deviceId }
    });
  }

  getDeviceListByScadaId (scadaId) {
    return this.deviceVo.findAll({
      where: { scadaId }
    });
  }

  insertDevice (device, t) {
    return this.deviceVo.create(device, { transaction: t });
  }

  updateDevice (device, scadaId, deviceId, t) {
    return this.deviceVo.update(
      device, { where: { scadaId, deviceId } }, { transaction: t });
  }

  deleteDevice (scadaId, deviceId, t) {
    return this.deviceVo.destroy({
      where: { scadaId, deviceId }
    }, { transaction: t });
  }

  deleteDeviceListByScadaId (scadaId, t) {
    return this.deviceVo.destroy({
      where: { scadaId }
    }, { transaction: t });
  }
}

module.exports = DeviceDao; */
