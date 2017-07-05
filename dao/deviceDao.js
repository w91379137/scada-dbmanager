'use strict';

const BaseDao = require('./baseDao.js');

class DeviceDao extends BaseDao {
  constructor (sequelize) {
    super(sequelize);

    this.deviceVo = sequelize.import('../models/deviceVo');
  }

  getDeviceDataById (scadaId, deviceId) {
    return this.deviceVo.findOne({
      where: {
        scadaId: scadaId,
        deviceId: deviceId
      }
    });
  }

  insertDeviceData (device, t) {
    return this.deviceVo.create(device, { transaction: t });
  }

  updateDeviceData (device, scadaId, deviceId, t) {
    return this.deviceVo.update(
      device, { where: { scadaId: scadaId, deviceId: deviceId } }, { transaction: t });
  }

  deleteDeviceData (scadaId, deviceId, t) {
    return this.deviceVo.destroy({
      where: {
        scadaId: scadaId,
        deviceId: deviceId
      }
    }, { transaction: t });
  }

  deleteDeviceDataByScadaId (scadaId, t) {
    return this.deviceVo.destroy({
      where: {
        scadaId: scadaId
      }
    }, { transaction: t });
  }
}

module.exports = DeviceDao;
