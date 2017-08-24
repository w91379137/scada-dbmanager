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

  getTag (scadaId, deviceId, tagName) {
    return this.tagVo.findOne({
      where: { scadaId, deviceId, tagName }
    });
  }

  getTagListByScadaId (scadaId) {
    return this.tagVo.findAll({
      where: { scadaId }
    });
  }

  getTagListBydeviceId (scadaId, deviceId) {
    return this.tagVo.findAll({
      where: { scadaId, deviceId }
    });
  }

  getAnalogTag (scadaId, deviceId, tagName) {
    return this.analogTagVo.findOne({
      where: { scadaId, deviceId, tagName }
    });
  }

  getDiscreteTag (scadaId, deviceId, tagName) {
    return this.discreteTagVo.findOne({
      where: { scadaId, deviceId, tagName }
    });
  }

  getTextTag (scadaId, deviceId, tagName) {
    return this.textTagVo.findOne({
      where: { scadaId, deviceId, tagName }
    });
  }

  getAlarmAnalogTag (scadaId, deviceId, tagName) {
    return this.alarmAnalogVo.findOne({
      where: { scadaId, deviceId, tagName }
    });
  }

  getAlarmDiscreteTag (scadaId, deviceId, tagName) {
    return this.alarmDiscreteVo.findOne({
      where: { scadaId, deviceId, tagName }
    });
  }

  insertTag (tag, trans) {
    return this.tagVo.create(tag, { transaction: trans });
  }

  insertAnalogTag (tag, trans) {
    return this.analogTagVo.create(tag, { transaction: trans });
  }

  insertDiscreteTag (tag, trans) {
    return this.discreteTagVo.create(tag, { transaction: trans });
  }

  insertTextTag (tag, trans) {
    return this.textTagVo.create(tag, { transaction: trans });
  }

  insertAlarmAnalogTag (tag, trans) {
    return this.alarmAnalogVo.create(tag, { transaction: trans });
  }

  insertAlarmDiscreteTag (tag, trans) {
    return this.alarmDiscreteVo.create(tag, { transaction: trans });
  }

  updateTag (tag, scadaId, deviceId, tagName, trans) {
    return this.tagVo.update(
      tag, { where: { scadaId, deviceId, tagName } }, { transaction: trans }
    );
  }

  updateAnalogTag (tag, scadaId, deviceId, tagName, trans) {
    return this.analogTagVo.update(
      tag, { where: { scadaId, deviceId, tagName } }, { transaction: trans }
    );
  }

  updateDiscreteTag (tag, scadaId, deviceId, tagName, trans) {
    return this.discreteTagVo.update(
      tag, { where: { scadaId, deviceId, tagName } }, { transaction: trans }
    );
  }

  updateTextTag (tag, scadaId, deviceId, tagName, trans) {
    return this.textTagVo.update(
      tag, { where: { scadaId, deviceId, tagName } }, { transaction: trans }
    );
  }

  updateAlarmAnalogTag (tag, scadaId, deviceId, tagName, trans) {
    return this.alarmAnalogVo.update(
      tag, { where: { scadaId, deviceId, tagName } }, { transaction: trans }
    );
  }

  updateAlarmDiscreteTag (tag, scadaId, deviceId, tagName, trans) {
    return this.alarmDiscreteVo.update(
      tag, { where: { scadaId, deviceId, tagName } }, { transaction: trans }
    );
  }

  deleteTagListByScadaId (scadaId, trans) {
    let promises = [];
    promises.push(this.tagVo.destroy({ where: { scadaId } }, { transaction: trans }));
    promises.push(this.analogTagVo.destroy({ where: { scadaId } }, { transaction: trans }));
    promises.push(this.alarmAnalogVo.destroy({ where: { scadaId } }, { transaction: trans }));
    promises.push(this.discreteTagVo.destroy({ where: { scadaId } }, { transaction: trans }));
    promises.push(this.alarmDiscreteVo.destroy({ where: { scadaId } }, { transaction: trans }));
    promises.push(this.textTagVo.destroy({ where: { scadaId } }, { transaction: trans }));
    return Promise.all(promises);
  }

  deleteTagListByDeviceId (scadaId, deviceId, trans) {
    let promises = [];
    promises.push(this.tagVo.destroy({ where: { scadaId, deviceId } }, { transaction: trans }));
    promises.push(this.analogTagVo.destroy({ where: { scadaId, deviceId } }, { transaction: trans }));
    promises.push(this.alarmAnalogVo.destroy({ where: { scadaId, deviceId } }, { transaction: trans }));
    promises.push(this.discreteTagVo.destroy({ where: { scadaId, deviceId } }, { transaction: trans }));
    promises.push(this.alarmDiscreteVo.destroy({ where: { scadaId, deviceId } }, { transaction: trans }));
    promises.push(this.textTagVo.destroy({ where: { scadaId, deviceId } }, { transaction: trans }));
    return Promise.all(promises);
  }

  deleteTag (scadaId, deviceId, tagName, trans) {
    let promises = [];
    promises.push(this.tagVo.destroy({ where: { scadaId, deviceId, tagName } }, { transaction: trans }));
    promises.push(this.analogTagVo.destroy({ where: { scadaId, deviceId, tagName } }, { transaction: trans }));
    promises.push(this.alarmAnalogVo.destroy({ where: { scadaId, deviceId, tagName } }, { transaction: trans }));
    promises.push(this.discreteTagVo.destroy({ where: { scadaId, deviceId, tagName } }, { transaction: trans }));
    promises.push(this.alarmDiscreteVo.destroy({ where: { scadaId, deviceId, tagName } }, { transaction: trans }));
    promises.push(this.textTagVo.destroy({ where: { scadaId, deviceId, tagName } }, { transaction: trans }));
    return Promise.all(promises);
  }

  deleteAlarmTag (scadaId, deviceId, tagName, type, trans) {
    let promises = [];
    promises.push(this.tagDao.getTag(scadaId, deviceId, tagName));
    switch (type) {
      case constant.tagType.analog:
        promises.push(this.alarmAnalogVo.destroy({
          where: { scadaId, deviceId, tagName }
        }, { transaction: trans }));
        break;
      case constant.tagType.discrete:
        promises.push(this.alarmDiscreteVo.destroy({
          where: { scadaId, deviceId, tagName }
        }, { transaction: trans }));
        break;
    }

    return Promise.all(promises);
  }
}

module.exports = TagDao;
