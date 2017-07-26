'use strict';

const Promise = require('bluebird');

const BaseDao = require('./baseDao.js');
const constant = require('../common/const.js');

class TagDao extends BaseDao {
  constructor (sequelize) {
    super(sequelize);

    this.tagVo = sequelize.import('../models/tagVo');
    this.analogTagVo = sequelize.import('../models/analogTagVo');
    this.discreteTagVo = sequelize.import('../models/discreteTagVo');
    this.textTagVo = sequelize.import('../models/textTagVo');
    this.alarmAnalogVo = sequelize.import('../models/alarmAnalogVo');
    this.alarmDiscreteVo = sequelize.import('../models/alarmDiscreteVo');
  }

  getTagDataById (scadaId, deviceId, name) {
    return this.tagVo.findOne({
      where: {
        scadaId: scadaId,
        deviceId: deviceId,
        name: name
      }
    });
  }

  getAnalogTagDataById (scadaId, deviceId, name) {
    return this.analogTagVo.findOne({
      where: {
        scadaId: scadaId,
        deviceId: deviceId,
        name: name
      }
    });
  }

  getDiscreteTagDataById (scadaId, deviceId, name) {
    return this.discreteTagVo.findOne({
      where: {
        scadaId: scadaId,
        deviceId: deviceId,
        name: name
      }
    });
  }

  getTextTagDataById (scadaId, deviceId, name) {
    return this.textTagVo.findOne({
      where: {
        scadaId: scadaId,
        deviceId: deviceId,
        name: name
      }
    });
  }

  getAlarmAnalogTagDataById (scadaId, deviceId, name) {
    return this.alarmAnalogVo.findOne({
      where: {
        scadaId: scadaId,
        deviceId: deviceId,
        name: name
      }
    });
  }

  getAlarmDiscreteTagDataById (scadaId, deviceId, name) {
    return this.alarmDiscreteVo.findOne({
      where: {
        scadaId: scadaId,
        deviceId: deviceId,
        name: name
      }
    });
  }

  insertTagData (tag, trans) {
    return this.tagVo.create(tag, { transaction: trans });
  }

  insertAnalogTagData (tag, trans) {
    return this.analogTagVo.create(tag, { transaction: trans });
  }

  insertDiscreteTagData (tag, trans) {
    return this.discreteTagVo.create(tag, { transaction: trans });
  }

  insertTextTagData (tag, trans) {
    return this.textTagVo.create(tag, { transaction: trans });
  }

  insertAlarmAnalogTagData (tag, trans) {
    return this.alarmAnalogVo.create(tag, { transaction: trans });
  }

  insertAlarmDiscreteTagData (tag, trans) {
    return this.alarmDiscreteVo.create(tag, { transaction: trans });
  }

  updateTagData (tag, scadaId, deviceId, tagName, trans) {
    return this.tagVo.update(
      tag, { where: { scadaId: scadaId, deviceId: deviceId, name: tagName } }, { transaction: trans }
    );
  }

  updateAnalogTagData (tag, scadaId, deviceId, tagName, trans) {
    return this.analogTagVo.update(
      tag, { where: { scadaId: scadaId, deviceId: deviceId, name: tagName } }, { transaction: trans }
    );
  }

  updateDiscreteTagData (tag, scadaId, deviceId, tagName, trans) {
    return this.discreteTagVo.update(
      tag, { where: { scadaId: scadaId, deviceId: deviceId, name: tagName } }, { transaction: trans }
    );
  }

  updateTextTagData (tag, scadaId, deviceId, tagName, trans) {
    return this.textTagVo.update(
      tag, { where: { scadaId: scadaId, deviceId: deviceId, name: tagName } }, { transaction: trans }
    );
  }

  updateAlarmAnalogTagData (tag, scadaId, deviceId, tagName, trans) {
    return this.alarmAnalogVo.update(
      tag, { where: { scadaId: scadaId, deviceId: deviceId, name: tagName } }, { transaction: trans }
    );
  }

  updateAlarmDiscreteTagData (tag, scadaId, deviceId, tagName, trans) {
    return this.alarmDiscreteVo.update(
      tag, { where: { scadaId: scadaId, deviceId: deviceId, name: tagName } }, { transaction: trans }
    );
  }

  deleteAllTagDataByScadaId (scadaId, trans) {
    let promises = [];
    promises.push(this.tagVo.destroy({ where: { scadaId: scadaId } }, { transaction: trans }));
    promises.push(this.analogTagVo.destroy({ where: { scadaId: scadaId } }, { transaction: trans }));
    promises.push(this.alarmAnalogVo.destroy({ where: { scadaId: scadaId } }, { transaction: trans }));
    promises.push(this.discreteTagVo.destroy({ where: { scadaId: scadaId } }, { transaction: trans }));
    promises.push(this.alarmDiscreteVo.destroy({ where: { scadaId: scadaId } }, { transaction: trans }));
    promises.push(this.textTagVo.destroy({ where: { scadaId: scadaId } }, { transaction: trans }));
    return Promise.all(promises);
  }

  deleteAllTagDataByDeviceId (scadaId, deviceId, trans) {
    let promises = [];
    promises.push(this.tagVo.destroy({ where: { scadaId: scadaId, deviceId: deviceId } }, { transaction: trans }));
    promises.push(this.analogTagVo.destroy({ where: { scadaId: scadaId, deviceId: deviceId } }, { transaction: trans }));
    promises.push(this.alarmAnalogVo.destroy({ where: { scadaId: scadaId, deviceId: deviceId } }, { transaction: trans }));
    promises.push(this.discreteTagVo.destroy({ where: { scadaId: scadaId, deviceId: deviceId } }, { transaction: trans }));
    promises.push(this.alarmDiscreteVo.destroy({ where: { scadaId: scadaId, deviceId: deviceId } }, { transaction: trans }));
    promises.push(this.textTagVo.destroy({ where: { scadaId: scadaId, deviceId: deviceId } }, { transaction: trans }));
    return Promise.all(promises);
  }

  deleteAllTagData (scadaId, deviceId, tagName, trans) {
    let promises = [];
    promises.push(this.tagVo.destroy({ where: { scadaId: scadaId, deviceId: deviceId, name: tagName } }, { transaction: trans }));
    promises.push(this.analogTagVo.destroy({ where: { scadaId: scadaId, deviceId: deviceId, name: tagName } }, { transaction: trans }));
    promises.push(this.alarmAnalogVo.destroy({ where: { scadaId: scadaId, deviceId: deviceId, name: tagName } }, { transaction: trans }));
    promises.push(this.discreteTagVo.destroy({ where: { scadaId: scadaId, deviceId: deviceId, name: tagName } }, { transaction: trans }));
    promises.push(this.alarmDiscreteVo.destroy({ where: { scadaId: scadaId, deviceId: deviceId, name: tagName } }, { transaction: trans }));
    promises.push(this.textTagVo.destroy({ where: { scadaId: scadaId, deviceId: deviceId, name: tagName } }, { transaction: trans }));
    return Promise.all(promises);
  }

  deleteAlarmTagData (scadaId, deviceId, name, type, trans) {
    let promises = [];
    promises.push(this.tagDao.getTagDataById(scadaId, deviceId, name));
    switch (type) {
      case constant.tagType.analog:
        promises.push(this.alarmAnalogVo.destroy({
          where: {
            scadaId: scadaId,
            deviceId: deviceId,
            name: name
          }
        }, { transaction: trans }));
        break;
      case constant.tagType.discrete:
        promises.push(this.alarmDiscreteVo.destroy({
          where: {
            scadaId: scadaId,
            deviceId: deviceId,
            name: name
          }
        }, { transaction: trans }));
        break;
    }

    return Promise.all(promises);
  }
}

module.exports = TagDao;
