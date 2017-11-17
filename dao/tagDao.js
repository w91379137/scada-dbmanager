'use strict';

const Promise = require('bluebird');

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

  // tagVo.belongsTo(analogTagVo, { foreignKey: 'scadaId' });
  // analogTagVo.belongsTo(tagVo, { foreignKey: 'scadaId' });
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
      switch (parseInt(obj.type)) {
        case constant.tagType.analog:
          Vo = analogTagVo;
          break;
        case constant.tagType.discrete:
          Vo = discreteTagVo;
          break;
        case constant.tagType.text:
          Vo = discreteTagVo;
          break;
      }
      if (Vo) {
        Vo.findOne({where: { scadaId, deviceId, tagName }}).then(function (info) {
          if (info) {
            resolve(Object.assign(obj.dataValues, info.dataValues));
          } else {
            resolve(obj);
          }
        });
      } else {
        resolve(obj);
      }
    }).catch(function (err) {
      reject(err);
    });
  });

  /* let sql = 'SELECT * FROM scada.tag_list AS tag_list ' +
  'LEFT OUTER JOIN scada.tag_text AS tag_text ON tag_list.scada_id = tag_text.scada_id AND tag_list.device_id = tag_text.device_id AND tag_list.tag_name = tag_text.tag_name ' +
  'LEFT OUTER JOIN scada.tag_discrete AS tag_discrete ON tag_list.scada_id = tag_discrete.scada_id AND tag_list.device_id = tag_discrete.device_id AND tag_list.tag_name = tag_discrete.tag_name ' +
  'LEFT OUTER JOIN scada.tag_analog AS tag_analog ON tag_list.scada_id = tag_analog.scada_id AND tag_list.device_id = tag_analog.device_id AND tag_list.tag_name = tag_analog.tag_name ' +
  'WHERE tag_list.scada_id = $scadaId AND tag_list.device_id = $deviceId AND tag_list.tag_name = $tagName';
  return _sequelize.query(sql, { bind: { scadaId: scadaId, deviceId: deviceId, tagName: tagName }, type: _sequelize.QueryTypes.SELECT }); */
}

function _getTagListByScadaId (scadaId) {
  return tagVo.findAll({
    where: { scadaId }
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

function _getTagListBydeviceId (scadaId, deviceId) {
  return tagVo.findAll({
    where: { scadaId, deviceId }
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

function _updateTag (tag, scadaId, deviceId, tagName, trans) {
  return tagVo.update(
      tag, { where: { scadaId, deviceId, tagName } }, { transaction: trans }
    );
}

function _updateAnalogTag (tag, scadaId, deviceId, tagName, trans) {
  return analogTagVo.update(
      tag, { where: { scadaId, deviceId, tagName } }, { transaction: trans }
    );
}

function _updateDiscreteTag (tag, scadaId, deviceId, tagName, trans) {
  return discreteTagVo.update(
      tag, { where: { scadaId, deviceId, tagName } }, { transaction: trans }
    );
}

function _updateTextTag (tag, scadaId, deviceId, tagName, trans) {
  return textTagVo.update(
      tag, { where: { scadaId, deviceId, tagName } }, { transaction: trans }
    );
}

function _updateAlarmAnalogTag (tag, scadaId, deviceId, tagName, trans) {
  return alarmAnalogVo.update(
      tag, { where: { scadaId, deviceId, tagName } }, { transaction: trans }
    );
}

function _updateAlarmDiscreteTag (tag, scadaId, deviceId, tagName, trans) {
  return alarmDiscreteVo.update(
      tag, { where: { scadaId, deviceId, tagName } }, { transaction: trans }
    );
}

function _deleteTagListByScadaId (scadaId, trans) {
  let promises = [];
  promises.push(tagVo.destroy({ where: { scadaId } }, { transaction: trans }));
  promises.push(analogTagVo.destroy({ where: { scadaId } }, { transaction: trans }));
  promises.push(alarmAnalogVo.destroy({ where: { scadaId } }, { transaction: trans }));
  promises.push(discreteTagVo.destroy({ where: { scadaId } }, { transaction: trans }));
  promises.push(alarmDiscreteVo.destroy({ where: { scadaId } }, { transaction: trans }));
  promises.push(textTagVo.destroy({ where: { scadaId } }, { transaction: trans }));
  return Promise.all(promises);
}

function _deleteTagListByDeviceId (scadaId, deviceId, trans) {
  let promises = [];
  promises.push(tagVo.destroy({ where: { scadaId, deviceId } }, { transaction: trans }));
  promises.push(analogTagVo.destroy({ where: { scadaId, deviceId } }, { transaction: trans }));
  promises.push(alarmAnalogVo.destroy({ where: { scadaId, deviceId } }, { transaction: trans }));
  promises.push(discreteTagVo.destroy({ where: { scadaId, deviceId } }, { transaction: trans }));
  promises.push(alarmDiscreteVo.destroy({ where: { scadaId, deviceId } }, { transaction: trans }));
  promises.push(textTagVo.destroy({ where: { scadaId, deviceId } }, { transaction: trans }));
  return Promise.all(promises);
}

function _deleteTag (scadaId, deviceId, tagName, trans) {
  let promises = [];
  promises.push(tagVo.destroy({ where: { scadaId, deviceId, tagName } }, { transaction: trans }));
  promises.push(analogTagVo.destroy({ where: { scadaId, deviceId, tagName } }, { transaction: trans }));
  promises.push(alarmAnalogVo.destroy({ where: { scadaId, deviceId, tagName } }, { transaction: trans }));
  promises.push(discreteTagVo.destroy({ where: { scadaId, deviceId, tagName } }, { transaction: trans }));
  promises.push(alarmDiscreteVo.destroy({ where: { scadaId, deviceId, tagName } }, { transaction: trans }));
  promises.push(textTagVo.destroy({ where: { scadaId, deviceId, tagName } }, { transaction: trans }));
  return Promise.all(promises);
}

function _deleteAlarmTag (scadaId, deviceId, tagName, type, trans) {
  let promises = [];
  promises.push(_getTag(scadaId, deviceId, tagName));
  switch (type) {
    case constant.tagType.analog:
      promises.push(alarmAnalogVo.destroy({
        where: { scadaId, deviceId, tagName }
      }, { transaction: trans }));
      break;
    case constant.tagType.discrete:
      promises.push(alarmDiscreteVo.destroy({
        where: { scadaId, deviceId, tagName }
      }, { transaction: trans }));
      break;
  }

  return Promise.all(promises);
}

module.exports = {
  init: _init,
  getTag: _getTag,
  getTagListByScadaId: _getTagListByScadaId,
  getWholeTagListByScadaId: _getWholeTagListByScadaId,
  getWholeTagListByDeviceId: _getWholeTagListByDeviceId,
  getTagListBydeviceId: _getTagListBydeviceId,
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
