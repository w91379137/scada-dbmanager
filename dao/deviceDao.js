'use strict';

const BaseDao = require('./baseDao.js');

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

module.exports = DeviceDao;
