'use strict';

const Promise = require('bluebird');
const Utils = require('../common/utils');
var squel = require('squel').useFlavour('postgres');

const constant = require('../common/const.js');

var tagVo = null;
var analogTagVo = null;
var discreteTagVo = null;
var textTagVo = null;
var alarmAnalogVo = null;
var alarmDiscreteVo = null;

var wholeAnalogTagVo = null;
var wholeDiscreteTagVo = null;
var wholeTextTagVo = null;

var _sequelize = null;

function _init (sequelize) {
  tagVo = sequelize.import('../models/tagVo');
  analogTagVo = sequelize.import('../models/analogTagVo');
  discreteTagVo = sequelize.import('../models/discreteTagVo');
  textTagVo = sequelize.import('../models/textTagVo');
  alarmAnalogVo = sequelize.import('../models/alarmAnalogVo');
  alarmDiscreteVo = sequelize.import('../models/alarmDiscreteVo');

  wholeAnalogTagVo = sequelize.import('../models/wholeAnalogTagVo');
  wholeDiscreteTagVo = sequelize.import('../models/wholeDiscreteTagVo');
  wholeTextTagVo = sequelize.import('../models/wholeTextTagVo');

  _sequelize = sequelize;
}

function __getAnalogTagListByScadaId (scadaId) {
  let sql =
    'SELECT tag_list.scada_id AS scadaId, tag_list.device_id AS deviceId, tag_list.tag_name AS tagName, tag_list.tag_description AS description, ' +
    'tag_list.alarm_status AS alarmStatus, tag_list.tag_type AS tagType, tag_list.array_size AS arraySize, tag_list.data_log AS dataLog, ' +
    'tag_list.read_only AS readOnly, tag_analog.eng_unit AS engUnit, tag_analog.span_high AS spanHigh, tag_analog.span_low AS spanLow, ' +
    'tag_analog.int_dsp_fmt AS intDspFmt, tag_analog.fra_dsp_fmt AS fraDspFmt FROM scada.tag_list AS tag_list INNER JOIN scada.tag_analog AS tag_analog ON ' +
    'tag_list.scada_id = tag_analog.scada_id AND tag_list.device_id = tag_analog.device_id AND tag_list.tag_name = tag_analog.tag_name ' +
    'WHERE tag_list.scada_id = $scadaId';

  return _sequelize.query(sql, { bind: { scadaId: scadaId }, type: _sequelize.QueryTypes.SELECT, model: wholeAnalogTagVo });
}

function __getAnalogTagListByDeviceId (scadaId, deviceId) {
  let sql =
    'SELECT tag_list.scada_id AS scadaId, tag_list.device_id AS deviceId, tag_list.tag_name AS tagName, tag_list.tag_description AS description, ' +
    'tag_list.alarm_status AS alarmStatus, tag_list.tag_type AS tagType, tag_list.array_size AS arraySize, tag_list.data_log AS dataLog, ' +
    'tag_list.read_only AS readOnly, tag_analog.eng_unit AS engUnit, tag_analog.span_high AS spanHigh, tag_analog.span_low AS spanLow, ' +
    'tag_analog.int_dsp_fmt AS intDspFmt, tag_analog.fra_dsp_fmt AS fraDspFmt FROM scada.tag_list AS tag_list INNER JOIN scada.tag_analog AS tag_analog ON ' +
    'tag_list.scada_id = tag_analog.scada_id AND tag_list.device_id = tag_analog.device_id AND tag_list.tag_name = tag_analog.tag_name ' +
    'WHERE tag_list.scada_id = $scadaId AND tag_list.device_id = $deviceId';

  return _sequelize.query(sql, { bind: { scadaId: scadaId, deviceId: deviceId }, type: _sequelize.QueryTypes.SELECT, model: wholeAnalogTagVo });
}

function __getDiscreteTagListByScadaId (scadaId) {
  let sql =
      'SELECT tag_list.scada_id AS scadaId, tag_list.device_id AS deviceId, tag_list.tag_name AS tagName, tag_list.tag_description AS description, ' +
      'tag_list.alarm_status AS alarmStatus, tag_list.tag_type AS tagType, tag_list.array_size AS arraySize, tag_list.data_log AS dataLog, ' +
      'tag_list.read_only AS readOnly, tag_discrete.state_0 AS state0, tag_discrete.state_1 AS state1, tag_discrete.state_2 AS state2, ' +
      'tag_discrete.state_3 AS state3, tag_discrete.state_4 AS state4, tag_discrete.state_5 AS state5, tag_discrete.state_6 AS state6, ' +
      'tag_discrete.state_7 AS state7 FROM scada.tag_list AS tag_list INNER JOIN scada.tag_discrete AS tag_discrete ON ' +
      'tag_list.scada_id = tag_discrete.scada_id AND tag_list.device_id = tag_discrete.device_id AND tag_list.tag_name = tag_discrete.tag_name ' +
      'WHERE tag_list.scada_id = $scadaId';

  return _sequelize.query(sql, { bind: { scadaId: scadaId }, type: _sequelize.QueryTypes.SELECT, model: wholeDiscreteTagVo });
}

function __getDiscreteTagListByDeviceId (scadaId, deviceId) {
  let sql =
      'SELECT tag_list.scada_id AS scadaId, tag_list.device_id AS deviceId, tag_list.tag_name AS tagName, tag_list.tag_description AS description, ' +
      'tag_list.alarm_status AS alarmStatus, tag_list.tag_type AS tagType, tag_list.array_size AS arraySize, tag_list.data_log AS dataLog, ' +
      'tag_list.read_only AS readOnly, tag_discrete.state_0 AS state0, tag_discrete.state_1 AS state1, tag_discrete.state_2 AS state2, ' +
      'tag_discrete.state_3 AS state3, tag_discrete.state_4 AS state4, tag_discrete.state_5 AS state5, tag_discrete.state_6 AS state6, ' +
      'tag_discrete.state_7 AS state7 FROM scada.tag_list AS tag_list INNER JOIN scada.tag_discrete AS tag_discrete ON ' +
      'tag_list.scada_id = tag_discrete.scada_id AND tag_list.device_id = tag_discrete.device_id AND tag_list.tag_name = tag_discrete.tag_name ' +
      'WHERE tag_list.scada_id = $scadaId AND tag_list.device_id = $deviceId';

  return _sequelize.query(sql, { bind: { scadaId: scadaId, deviceId: deviceId }, type: _sequelize.QueryTypes.SELECT, model: wholeDiscreteTagVo });
}

function __getTextTagListByScadaId (scadaId) {
  let sql =
    'SELECT tag_list.scada_id AS scadaId, tag_list.device_id AS deviceId, tag_list.tag_name AS tagName, tag_list.tag_description AS description, ' +
    'tag_list.alarm_status AS alarmStatus, tag_list.tag_type AS tagType, tag_list.array_size AS arraySize, tag_list.data_log AS dataLog, ' +
    'tag_list.read_only AS readOnly FROM scada.tag_list AS tag_list INNER JOIN scada.tag_text AS tag_text ON ' +
    'tag_list.scada_id = tag_text.scada_id AND tag_list.device_id = tag_text.device_id AND tag_list.tag_name = tag_text.tag_name ' +
    'WHERE tag_list.scada_id = $scadaId';

  return _sequelize.query(sql, { bind: { scadaId: scadaId }, type: _sequelize.QueryTypes.SELECT, model: wholeTextTagVo });
}

function __getTextTagListByDeviceId (scadaId, deviceId) {
  let sql =
    'SELECT tag_list.scada_id AS scadaId, tag_list.device_id AS deviceId, tag_list.tag_name AS tagName, tag_list.tag_description AS description, ' +
    'tag_list.alarm_status AS alarmStatus, tag_list.tag_type AS tagType, tag_list.array_size AS arraySize, tag_list.data_log AS dataLog, ' +
    'tag_list.read_only AS readOnly FROM scada.tag_list AS tag_list INNER JOIN scada.tag_text AS tag_text ON ' +
    'tag_list.scada_id = tag_text.scada_id AND tag_list.device_id = tag_text.device_id AND tag_list.tag_name = tag_text.tag_name ' +
    'WHERE tag_list.scada_id = $scadaId AND tag_list.device_id = $deviceId';

  return _sequelize.query(sql, { bind: { scadaId: scadaId, deviceId: deviceId }, type: _sequelize.QueryTypes.SELECT, model: wholeTextTagVo });
}

function _getTag (scadaId, deviceId, tagName) {
  return new Promise((resolve, reject) => {
    tagVo.findOne({where: { scadaId, deviceId, tagName }}).then(function (obj) {
      if (!obj) {
        resolve(obj);
      }
      let Vo = null;
      // let alarmVo = null;
      switch (parseInt(obj.tagType)) {
        case constant.tagType.analog:
          Vo = analogTagVo;
          // alarmVo = alarmAnalogVo;
          break;
        case constant.tagType.discrete:
          Vo = discreteTagVo;
          // alarmVo = alarmDiscreteVo;
          break;
        case constant.tagType.text:
          Vo = textTagVo;
          break;
      }
      if (Vo) {
        return Vo.findOne({where: { scadaId, deviceId, tagName }}).then(function (info) {
          // obj = info ? Object.assign(obj.dataValues, info.dataValues) : obj.dataValues;
          if (info) {
            obj = Object.assign(obj.dataValues, info.dataValues);
          }
          /* if (alarmVo) {
            return alarmVo.findOne({where: { scadaId, deviceId, tagName }}).then(function (alarm) {
              obj.alarm = {};
              if (alarm) {
                delete alarm.scadaId;
                delete alarm.deviceId;
                delete alarm.tagName;
                obj.alarm = alarm;
              }
              resolve(obj);
            });
          } else {
            resolve(obj);
          } */
          resolve(obj);
        });
      } else {
        resolve(obj);
      }
    }).catch(function (err) {
      reject(err);
    });
  });
}

/**
 * @param {Object} filterObj
 * @param {Integer} filterObj.offset: starting index
 * @param {Integer} filterObj.limit: data retrived
 * @param {String} filterObj.tagName: filter tag name
 * @param {String} filterObj.description: filter tag desc
 * @param {String} filterObj.sortby: sort properties
 * @param {String} filterObj.order: order asc or not
 * @param {Boolean} filterObj.detail: select id & name only
 * @param {String} filterObj.userName: filter the tags that userName can access
 */
function _getTagList (filterObj = {}) {
  let offset = filterObj.offset ? filterObj.offset : 0;
  let limit = filterObj.limit ? filterObj.limit : null;
  let sortby = filterObj.sortby ? filterObj.sortby : 'tagName';
  let order = filterObj.order ? filterObj.order : true;
  let detail = filterObj.detail ? filterObj.detail : false;

  let sql = squel.select().from('scada.tag_list', 'Tag');
  if (detail) {
    for (let idx in tagVo.attributes) {
      sql.field('Tag.' + tagVo.attributes[idx].field, idx);
    }
  } else {
    sql.field('Tag.scada_id', 'scadaId');
    sql.field('Tag.device_id', 'deviceId');
    sql.field('Tag.tag_name', 'tagName');
  }
  sql.distinct();
  if (filterObj.userName) {
    sql.join('scada.user_allow_device', 'UserAllowDevice', squel.expr().and('Tag.scada_id = UserAllowDevice.scada_id').and('Tag.device_id = UserAllowDevice.device_id'));
    sql.join('scada.user_info', 'UserInfo', squel.expr().and('UserAllowDevice.user_id = UserInfo.user_id'));
    sql.where('Userinfo.user_name = ? ', filterObj.userName);
  }
  for (let idx in tagVo.attributes) {
    let key = tagVo.attributes[idx];
    if (!Utils.isNullOrUndefined(filterObj[idx])) {
      sql.where('Tag.' + key.field + ' LIKE ?', filterObj[idx]);
    }
  }
  sql.order(sortby, order);
  return new Promise((resolve, reject) => {
    _sequelize.query(sql.toString(), { type: _sequelize.QueryTypes.SELECT, model: tagVo }).then((raws) => {
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
 * @param {String} filterObj.tagName: filter tag name
 * @param {String} filterObj.description: filter tag desc
 * @param {String} filterObj.sortby: sort properties
 * @param {String} filterObj.order: order asc or not
 * @param {Boolean} filterObj.detail: select id & name only
 * @param {String} filterObj.userName: filter the tags that userName can access
 */
function _getTagListByProjectId (projectId, filterObj = {}) {
  let offset = filterObj.offset ? filterObj.offset : 0;
  let limit = filterObj.limit ? filterObj.limit : null;
  let sortby = filterObj.sortby ? filterObj.sortby : 'tagName';
  let order = filterObj.order ? filterObj.order : true;
  let detail = filterObj.detail ? filterObj.detail : false;

  let sql = squel.select().from('scada.tag_list', 'Tag');
  if (detail) {
    for (let idx in tagVo.attributes) {
      sql.field('Tag.' + tagVo.attributes[idx].field, idx);
    }
  } else {
    sql.field('Tag.scada_id', 'scadaId');
    sql.field('Tag.device_id', 'deviceId');
    sql.field('Scada.tag_name', 'tagName');
  }
  sql.distinct();
  sql.join('scada.scada_list', 'Scada', squel.expr().and('Tag.scada_id = Scada.scada_id'));
  if (filterObj.userName) {
    sql.join('scada.user_allow_device', 'UserAllowDevice', squel.expr().and('Device.scada_id = UserAllowDevice.scada_id').and('Device.device_id = UserAllowDevice.device_id'));
    sql.join('scada.user_info', 'UserInfo', squel.expr().and('UserAllowDevice.user_id = UserInfo.user_id'));
    sql.where('Userinfo.user_name = ? ', filterObj.userName);
  }
  sql.where('Scada.proj_id = ? ', projectId);
  for (let idx in tagVo.attributes) {
    let key = tagVo.attributes[idx];
    if (!Utils.isNullOrUndefined(filterObj[idx])) {
      sql.where('Tag.' + key.field + ' LIKE ?', filterObj[idx]);
    }
  }
  sql.order(sortby, order);
  return new Promise((resolve, reject) => {
    _sequelize.query(sql.toString(), { type: _sequelize.QueryTypes.SELECT, model: tagVo }).then((raws) => {
      resolve({count: raws.length, rows: raws.slice(offset, limit ? limit + offset : raws.length)});
    }).catch((err) => {
      reject(err);
    });
  });
}

/**
 * @param {String} scadaId
 * @param {Object} filterObj
 * @param {Integer} filterObj.offset: starting index
 * @param {Integer} filterObj.limit: data retrived
 * @param {String} filterObj.tagName: filter tag name
 * @param {String} filterObj.description: filter tag desc
 * @param {String} filterObj.sortby: sort properties
 * @param {String} filterObj.order: order asc or desc
 * @param {Boolean} filterObj.detail: select id & name only
 * @param {String} filterObj.userName: filter the tags that userName can access
 */
function _getTagListByScadaId (scadaId, filterObj = {}) {
  let offset = filterObj.offset ? filterObj.offset : 0;
  let limit = filterObj.limit ? filterObj.limit : null;
  let sortby = filterObj.sortby ? filterObj.sortby : 'tagName';
  let order = filterObj.order ? filterObj.order : true;
  let detail = filterObj.detail ? filterObj.detail : false;

  let sql = squel.select().from('scada.tag_list', 'Tag');
  if (detail) {
    for (let idx in tagVo.attributes) {
      sql.field('Tag.' + tagVo.attributes[idx].field, idx);
    }
  } else {
    sql.field('Tag.scada_id', 'scadaId');
    sql.field('Tag.device_id', 'deviceId');
    sql.field('Tag.tag_name', 'tagName');
  }
  sql.distinct();
  sql.join('scada.scada_list', 'Scada', squel.expr().and('Tag.scada_id = Scada.scada_id'));
  if (filterObj.userName) {
    sql.join('scada.user_allow_device', 'UserAllowDevice', squel.expr().and('Tag.scada_id = UserAllowDevice.scada_id').and('Tag.device_id = UserAllowDevice.device_id'));
    sql.join('scada.user_info', 'UserInfo', squel.expr().and('UserAllowDevice.user_id = UserInfo.user_id'));
    sql.where('Userinfo.user_name = ? ', filterObj.userName);
  }
  sql.where('Tag.scada_id = ? ', scadaId);
  for (let idx in tagVo.attributes) {
    let key = tagVo.attributes[idx];
    if (!Utils.isNullOrUndefined(filterObj[idx])) {
      sql.where('Tag.' + key.field + ' LIKE ?', filterObj[idx]);
    }
  }
  sql.order(sortby, order);
  return new Promise((resolve, reject) => {
    _sequelize.query(sql.toString(), { type: _sequelize.QueryTypes.SELECT, model: tagVo }).then((raws) => {
      resolve({count: raws.length, rows: raws.slice(offset, limit ? limit + offset : raws.length)});
    }).catch((err) => {
      reject(err);
    });
  });
}

/**
 * @param {String} scadaId
 * @param {String} deviceId
 * @param {Object} filterObj
 * @param {Integer} filterObj.offset: starting index
 * @param {Integer} filterObj.limit: data retrived
 * @param {String} filterObj.tagName: filter tag name
 * @param {String} filterObj.description: filter tag desc
 * @param {String} filterObj.sortby: sort properties
 * @param {String} filterObj.order: order asc or desc
 * @param {Boolean} filterObj.detail: select id & name only
 * @param {String} filterObj.userName: filter the tags that userName can access
 */
function _getTagListByDeviceId (scadaId, deviceId, filterObj = {}) {
  let offset = filterObj.offset ? filterObj.offset : 0;
  let limit = filterObj.limit ? filterObj.limit : null;
  let sortby = filterObj.sortby ? filterObj.sortby : 'tagName';
  let order = filterObj.order ? filterObj.order : true;
  let detail = filterObj.detail ? filterObj.detail : false;

  let sql = squel.select().from('scada.tag_list', 'Tag');
  if (detail) {
    for (let idx in tagVo.attributes) {
      sql.field('Tag.' + tagVo.attributes[idx].field, idx);
    }
  } else {
    sql.field('Tag.scada_id', 'scadaId');
    sql.field('Tag.device_id', 'deviceId');
    sql.field('Tag.tag_name', 'tagName');
  }
  sql.distinct();
  sql.join('scada.scada_list', 'Scada', squel.expr().and('Tag.scada_id = Scada.scada_id'));
  if (filterObj.userName) {
    sql.join('scada.user_allow_device', 'UserAllowDevice', squel.expr().and('Tag.scada_id = UserAllowDevice.scada_id').and('Tag.device_id = UserAllowDevice.device_id'));
    sql.join('scada.user_info', 'UserInfo', squel.expr().and('UserAllowDevice.user_id = UserInfo.user_id'));
    sql.where('Userinfo.user_name = ? ', filterObj.userName);
  }
  sql.where('Tag.scada_id = ? AND Tag.device_id = ?', scadaId, deviceId);
  for (let idx in tagVo.attributes) {
    let key = tagVo.attributes[idx];
    if (!Utils.isNullOrUndefined(filterObj[idx])) {
      sql.where('Tag.' + key.field + ' LIKE ?', filterObj[idx]);
    }
  }
  sql.order(sortby, order);
  return new Promise((resolve, reject) => {
    _sequelize.query(sql.toString(), { type: _sequelize.QueryTypes.SELECT, model: tagVo }).then((raws) => {
      resolve({count: raws.length, rows: raws.slice(offset, limit ? limit + offset : raws.length)});
    }).catch((err) => {
      reject(err);
    });
  });
}

function _getWholeTagListByScadaId (scadaId) {
  return new Promise((resolve, reject) => {
    let output = {};
    let promise = [];
    promise.push(__getAnalogTagListByScadaId(scadaId));
    promise.push(__getDiscreteTagListByScadaId(scadaId));
    promise.push(__getTextTagListByScadaId(scadaId));
    Promise.all(promise)
      .then((results) => {
        output.analogTagList = results[0];
        output.discreteTagList = results[1];
        output.textTagList = results[2];
        resolve(output);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function _getWholeTagListByDeviceId (scadaId, deviceId) {
  return new Promise((resolve, reject) => {
    let output = {};
    let promise = [];
    promise.push(__getAnalogTagListByDeviceId(scadaId, deviceId));
    promise.push(__getDiscreteTagListByDeviceId(scadaId, deviceId));
    promise.push(__getTextTagListByDeviceId(scadaId, deviceId));
    Promise.all(promise)
      .then((results) => {
        output.analogTagList = results[0];
        output.discreteTagList = results[1];
        output.textTagList = results[2];
        resolve(output);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function _getAnalogTag (scadaId, deviceId, tagName) {
  return analogTagVo.findOne({
    where: { scadaId, deviceId, tagName }
  });
}

function _getDiscreteTag (scadaId, deviceId, tagName) {
  return discreteTagVo.findOne({
    where: { scadaId, deviceId, tagName }
  });
}

function _getTextTag (scadaId, deviceId, tagName) {
  return textTagVo.findOne({
    where: { scadaId, deviceId, tagName }
  });
}

function _getAlarmAnalogTag (scadaId, deviceId, tagName) {
  return alarmAnalogVo.findOne({
    where: { scadaId, deviceId, tagName }
  });
}

function _getAlarmDiscreteTag (scadaId, deviceId, tagName) {
  return alarmDiscreteVo.findOne({
    where: { scadaId, deviceId, tagName }
  });
}

function _insertTag (tag, trans) {
  return tagVo.create(tag, { transaction: trans });
}

function _insertAnalogTag (tag, trans) {
  return analogTagVo.create(tag, { transaction: trans });
}

function _insertDiscreteTag (tag, trans) {
  return discreteTagVo.create(tag, { transaction: trans });
}

function _insertTextTag (tag, trans) {
  return textTagVo.create(tag, { transaction: trans });
}

function _insertAlarmAnalogTag (tag, trans) {
  return alarmAnalogVo.create(tag, { transaction: trans });
}

function _insertAlarmDiscreteTag (tag, trans) {
  return alarmDiscreteVo.create(tag, { transaction: trans });
}

function _updateTag (scadaId, deviceId, tagName, tag, trans) {
  return tagVo.update(
      tag, { where: { scadaId, deviceId, tagName }, transaction: trans }
    );
}

function _updateAnalogTag (scadaId, deviceId, tagName, tag, trans) {
  return analogTagVo.update(
      tag, { where: { scadaId, deviceId, tagName }, transaction: trans }
    );
}

function _updateDiscreteTag (scadaId, deviceId, tagName, tag, trans) {
  return discreteTagVo.update(
      tag, { where: { scadaId, deviceId, tagName }, transaction: trans }
    );
}

function _updateTextTag (scadaId, deviceId, tagName, tag, trans) {
  return textTagVo.update(
      tag, { where: { scadaId, deviceId, tagName }, transaction: trans }
    );
}

function _updateAlarmAnalogTag (scadaId, deviceId, tagName, tag, trans) {
  return alarmAnalogVo.update(
      tag, { where: { scadaId, deviceId, tagName }, transaction: trans }
    );
}

function _updateAlarmDiscreteTag (scadaId, deviceId, tagName, tag, trans) {
  return alarmDiscreteVo.update(
      tag, { where: { scadaId, deviceId, tagName }, transaction: trans }
    );
}

function _deleteTagListByScadaId (scadaId, trans) {
  let promises = [];
  promises.push(tagVo.destroy({ where: { scadaId }, transaction: trans }));
  promises.push(analogTagVo.destroy({ where: { scadaId }, transaction: trans }));
  promises.push(alarmAnalogVo.destroy({ where: { scadaId }, transaction: trans }));
  promises.push(discreteTagVo.destroy({ where: { scadaId }, transaction: trans }));
  promises.push(alarmDiscreteVo.destroy({ where: { scadaId }, transaction: trans }));
  promises.push(textTagVo.destroy({ where: { scadaId }, transaction: trans }));
  return Promise.all(promises);
}

function _deleteTagListByDeviceId (scadaId, deviceId, trans) {
  let promises = [];
  promises.push(tagVo.destroy({ where: { scadaId, deviceId }, transaction: trans }));
  promises.push(analogTagVo.destroy({ where: { scadaId, deviceId }, transaction: trans }));
  promises.push(alarmAnalogVo.destroy({ where: { scadaId, deviceId }, transaction: trans }));
  promises.push(discreteTagVo.destroy({ where: { scadaId, deviceId }, transaction: trans }));
  promises.push(alarmDiscreteVo.destroy({ where: { scadaId, deviceId }, transaction: trans }));
  promises.push(textTagVo.destroy({ where: { scadaId, deviceId }, transaction: trans }));
  return Promise.all(promises);
}

function _deleteTag (scadaId, deviceId, tagName, trans) {
  let promises = [];
  promises.push(tagVo.destroy({ where: { scadaId, deviceId, tagName }, transaction: trans }));
  promises.push(analogTagVo.destroy({ where: { scadaId, deviceId, tagName }, transaction: trans }));
  promises.push(alarmAnalogVo.destroy({ where: { scadaId, deviceId, tagName }, transaction: trans }));
  promises.push(discreteTagVo.destroy({ where: { scadaId, deviceId, tagName }, transaction: trans }));
  promises.push(alarmDiscreteVo.destroy({ where: { scadaId, deviceId, tagName }, transaction: trans }));
  promises.push(textTagVo.destroy({ where: { scadaId, deviceId, tagName }, transaction: trans }));
  return Promise.all(promises);
}

function _deleteAlarmTag (scadaId, deviceId, tagName, type, trans) {
  let promises = [];
  promises.push(_getTag(scadaId, deviceId, tagName));
  switch (type) {
    case constant.tagType.analog:
      promises.push(alarmAnalogVo.destroy({
        where: { scadaId, deviceId, tagName },
        transaction: trans }));
      break;
    case constant.tagType.discrete:
      promises.push(alarmDiscreteVo.destroy({
        where: { scadaId, deviceId, tagName },
        transaction: trans }));
      break;
  }

  return Promise.all(promises);
}

module.exports = {
  init: _init,
  getTagList: _getTagList,
  getTagListByProjectId: _getTagListByProjectId,
  getTagListByScadaId: _getTagListByScadaId,
  getTagListByDeviceId: _getTagListByDeviceId,
  getTag: _getTag,
  getWholeTagListByScadaId: _getWholeTagListByScadaId,
  getWholeTagListByDeviceId: _getWholeTagListByDeviceId,
  getAnalogTag: _getAnalogTag,
  getDiscreteTag: _getDiscreteTag,
  getTextTag: _getTextTag,
  getAlarmAnalogTag: _getAlarmAnalogTag,
  getAlarmDiscreteTag: _getAlarmDiscreteTag,
  insertTag: _insertTag,
  insertAnalogTag: _insertAnalogTag,
  insertDiscreteTag: _insertDiscreteTag,
  insertTextTag: _insertTextTag,
  insertAlarmAnalogTag: _insertAlarmAnalogTag,
  insertAlarmDiscreteTag: _insertAlarmDiscreteTag,
  updateTag: _updateTag,
  updateAnalogTag: _updateAnalogTag,
  updateDiscreteTag: _updateDiscreteTag,
  updateTextTag: _updateTextTag,
  updateAlarmAnalogTag: _updateAlarmAnalogTag,
  updateAlarmDiscreteTag: _updateAlarmDiscreteTag,
  deleteTagListByScadaId: _deleteTagListByScadaId,
  deleteTagListByDeviceId: _deleteTagListByDeviceId,
  deleteTag: _deleteTag,
  deleteAlarmTag: _deleteAlarmTag
};
