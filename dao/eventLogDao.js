'use strict';

const Promise = require('bluebird');
const Utils = require('../common/utils');
let squel = require('squel').useFlavour('postgres');

let eventLogVo = null;
let eventLogRecordVo = null;
let eventLogSelectVo = null;

let _sequelize = null;
let eventLogMapper = {};
let eventLogRecordMapper = {};

function _init (sequelize) {
  eventLogVo = sequelize.import('../models/eventLogVo');
  eventLogRecordVo = sequelize.import('../models/eventLogRecordVo');
  eventLogSelectVo = sequelize.import('../models/eventLogSelectVo');

  _sequelize = sequelize;

  for (let key in eventLogVo.attributes) {
    eventLogMapper[eventLogVo.attributes[key].field] = key;
  }

  for (let key in eventLogRecordVo.attributes) {
    eventLogRecordMapper[eventLogRecordVo.attributes[key].field] = key;
  }
}

/**
 * @param {Object} eventLogObj
 * @param {String} eventLogObj.eventName - eventName
 * @param {String} eventLogObj.scadaId - scadaId
 * @param {String} eventLogObj.description - description
 * @param {String} eventLogObj.deviceId - deviceId
 * @param {String} eventLogObj.tagName - tagName
 * @param {Integer} eventLogObj.eventType - eventType
 * @param {Double} eventLogObj.refValue - refValue
 * @param {String} eventLogObj.refDeviceId - refDeviceId
 * @param {String} eventLogObj.refTagName - refTagName
 * @param {Integer} eventLogObj.sampleInterval - sampleInterval
 * @param {Integer} eventLogObj.sampleUnit - sampleUnit
 * @param {Integer} eventLogObj.sampleAmount - sampleAmount
 * @param {Object[]} eventLogObj.eventLogRecord - eventLogRecord
 * @param {String} eventLogObj.eventLogRecord.deviceId - deviceId
 * @param {String} eventLogObj.eventLogRecord.tagName - tagName
 */

function _insertEventLog (eventLogObj, trans) {
  let eventName = eventLogObj.eventName;
  let scadaId = eventLogObj.scadaId;

  // clone object
  let eventLogs = Object.assign({}, eventLogObj);
  delete eventLogs.eventLogRecord;

  let eventLogRecords = [];

  if (Array.isArray(eventLogObj.eventLogRecord)) {
    eventLogRecords = eventLogObj.eventLogRecord;

    for (let record of eventLogRecords) {
      record.eventName = eventName;
      record.scadaId = scadaId;
    }
  }

  // create EventLog and EventLogRecord
  return eventLogVo.create(eventLogs, {transaction: trans}).then((_eventLog) => {
    return eventLogRecordVo.bulkCreate(eventLogRecords, {transaction: trans}).then((records) => {
      // convert the key name to match model field keys, only bulkCreate need to do that.
      let _records = records.map((_record) => {
        let obj = {};
        for (let key in _record.dataValues) {
          if (eventLogRecordMapper[key] && (key === 'device_id' || key === 'tag_name')) {
            obj[eventLogRecordMapper[key]] = _record.dataValues[key];
          }
        }
        return obj;
      });

      let returnEventLog = _eventLog.dataValues;
      returnEventLog.eventLogRecord = _records;

      return Promise.resolve(returnEventLog);
    }).catch((err) => {
      return Promise.reject(err);
    });
  }).catch((err) => {
    return Promise.reject(err);
  });
}

/**
 * @param {Object} filterObj
 * @param {Integer} filterObj.offset - starting index
 * @param {Integer} filterObj.limit - data retrived
 * @param {String} filterObj.scadaId - scadaId of event
 * @param {String} filterObj.eventName - eventName of event
 * @param {String} filterObj.sortby - sort properties
 * @param {String} filterObj.order - order asc or not
 * @param {Boolean} filterObj.detail - select id & name only
 * @param {String} filterObj.userName - filter the scadas that userName can access
 */

function _getEventLogList (filterObj = {}) {
  let offset = filterObj.offset ? filterObj.offset : 0;
  let limit = filterObj.limit ? filterObj.limit : null;
  let sortby = filterObj.sortby ? filterObj.sortby : 'scadaId';
  let order = filterObj.order !== null ? filterObj.order : true;
  let detail = filterObj.detail ? filterObj.detail : false;

  let sql = squel.select().from('scada.event_log_list', 'EventLog');

  if (detail) {
    for (let idx in eventLogVo.attributes) {
      sql.field('EventLog.' + eventLogVo.attributes[idx].field, idx);
    }

    sql.field('array_agg(jsonb_build_object(\'deviceId\', EventLogRecord.device_id, \'tagName\', EventLogRecord.tag_name))', 'eventLogRecord');
    sql.distinct();

    sql.left_join('scada.event_log_record', 'EventLogRecord', squel.expr()
      .and('EventLog.scada_id = EventLogRecord.scada_id')
      .and('EventLog.event_name = EventLogRecord.event_name'));
    sql.group('EventLog.scada_id');
    sql.group('EventLog.event_name');
  } else {
    sql.field('EventLog.event_name', 'eventName');
    sql.field('EventLog.scada_id', 'scadaId');
    sql.field('EventLog.description', 'description');
    sql.distinct();
  }

  if (filterObj.userName) {
    // TODO: check user (permission validation)
    // sql.join('scada.user_allow_device', 'UserAllowDevice', squel.expr().and('Scada.proj_id = UserAllowDevice.proj_id').and('Scada.scada_id = UserAllowDevice.scada_id'));
    // sql.join('scada.user_info', 'UserInfo', squel.expr().and('UserAllowDevice.user_id = UserInfo.user_id'));
    // sql.where('Userinfo.user_name = ? ', filterObj.userName);
  }
  for (let idx in eventLogVo.attributes) {
    let key = eventLogVo.attributes[idx];
    if (!Utils.isNullOrUndefined(filterObj[idx])) {
      sql.where('EventLog.' + key.field + ' LIKE ?', filterObj[idx]);
    }
  }
  sql.order(sortby, order);
  return new Promise((resolve, reject) => {
    _sequelize.query(sql.toString(), { type: _sequelize.QueryTypes.SELECT, model: eventLogSelectVo }).then((raws) => {
      raws.map((raw, idx) => {
        if (!raw.eventLogRecord || !raw.eventLogRecord[0].tagName || !raw.eventLogRecord[0].deviceId) {
          // if event doesn't has log records, delete eventLogRecord field from result obj.
          delete raws[idx].dataValues.eventLogRecord;
        }
      });

      resolve({count: raws.length, rows: raws.slice(offset, limit ? limit + offset : raws.length)});
    }).catch((err) => {
      reject(err);
    });
  });
}

/**
 * @property {String}  scadaId                                   - scadaId
 * @property {String}  prevEventName                             - prevEventName
 * @property {object}  reqEventLog                               - reqEventLog
 * @property {String}  reqEventLog.eventName                     - reqEventLog.eventName
 * @property {String}  reqEventLog.description                   - reqEventLog.description
 * @property {number}  reqEventLog.eventType                     - reqEventLog.eventType
 * @property {number}  reqEventLog.refValue                      - reqEventLog.refValue
 * @property {String}  reqEventLog.refDeviceId                   - reqEventLog.refDeviceId
 * @property {String}  reqEventLog.refTagName                    - reqEventLog.refTagName
 * @property {number}  reqEventLog.sampleInterval                - reqEventLog.sampleInterval
 * @property {number}  reqEventLog.sampleUnit                    - reqEventLog.sampleUnit
 * @property {number}  reqEventLog.sampleAmount                  - reqEventLog.sampleAmount
 * @property {object[]}  reqEventLog.eventLogRecord              - reqEventLog.eventLogRecord
 * @property {String}  reqEventLog.eventLogRecord.deviceId       - reqEventLog.eventLogRecord.deviceId
 * @property {String}  reqEventLog.eventLogRecord.tagName        - reqEventLog.eventLogRecord.tagName
 */

function _updateEventLog (scadaId, prevEventName, reqEventLog, trans) {
  // eventLog
  let eventLog = Object.assign({}, reqEventLog);
  delete eventLog.eventLogRecord;

  // eventLogRecord
  let newEventName = reqEventLog.eventName;

  let doUpdateRecord = false;
  let eventLogRecords = [];

  if (Array.isArray(reqEventLog.eventLogRecord)) {
    doUpdateRecord = true;

    eventLogRecords = reqEventLog.eventLogRecord;

    for (let record of eventLogRecords) {
      record.eventName = newEventName;
      record.scadaId = scadaId;
    }
  }

  return eventLogVo.update(eventLog, { where: { scadaId, eventName: prevEventName }, transaction: trans }).then((res) => {
    if (res[0] === 0) {
      return Promise.reject(Error('Can not find the eventLog which match input scadaId and eventName.'));
    } else if (res[0] === 1 && doUpdateRecord) {
      return eventLogRecordVo.destroy({ where: { scadaId, eventName: prevEventName }, transaction: trans });
    } else {
      return Promise.resolve(true);
    }
  }).then((res) => {
    if (doUpdateRecord) {
      return eventLogRecordVo.bulkCreate(eventLogRecords, {transaction: trans});
    } else {
      return Promise.resolve(true);
    }
  }).then((res) => {
    return Promise.resolve(true);
  }).catch((err) => {
    return Promise.reject(err);
  });
}

function _deleteEventLog (scadaId, eventName, trans) {
  let promises = [];
  promises.push(eventLogVo.destroy({ where: { scadaId, eventName }, transaction: trans }));
  promises.push(eventLogRecordVo.destroy({ where: { scadaId, eventName }, transaction: trans }));
  return Promise.all(promises).then((result) => {
    if (result[0] === 0 && result[1] === 0) {
      return Promise.reject(Error('No such eventLog or eventLogRecord matched the input scadaId and eventName.'));
    } else {
      return Promise.resolve(true);
    }
  }).catch((err) => {
    return Promise.reject(err);
  });
}

module.exports = {
  init: _init,
  insertEventLog: _insertEventLog,
  getEventLogList: _getEventLogList,
  updateEventLog: _updateEventLog,
  deleteEventLog: _deleteEventLog
};
