'use strict';

const Promise = require('bluebird');
const Utils = require('../common/utils');
let squel = require('squel').useFlavour('postgres');

let eventLogVo = null;
let eventLogRecordVo = null;
// var scadaVo = null;
// var userAllowDeviceVo = null;
// var deviceVo = null;
// var structModelVo = null;
// var tagDao = require('./tagDao');
let _sequelize = null;
let eventLogMapper = {};
let eventLogRecordMapper = {};

function _init (sequelize) {
  // scadaVo = sequelize.import('../models/scadaVo');
  // deviceVo = sequelize.import('../models/deviceVo');
  eventLogVo = sequelize.import('../models/eventLogVo');
  eventLogRecordVo = sequelize.import('../models/eventLogRecordVo');

  _sequelize = sequelize;

  for (let key in eventLogVo.attributes) {
    eventLogMapper[eventLogVo.attributes[key].field] = key;
  }

  for (let key in eventLogRecordVo.attributes) {
    eventLogRecordMapper[eventLogRecordVo.attributes[key].field] = key;
  }
}

/**
 * @param {Object} filterObj
 * @param {Integer} filterObj.offset: starting index
 * @param {Integer} filterObj.limit: data retrived
 * @param {String} filterObj.scadaName: filter scada name
 * @param {String} filterObj.description: filter scada desc
 * @param {String} filterObj.sortby: sort properties
 * @param {String} filterObj.order: order asc or not
 * @param {Boolean} filterObj.detail: select id & name only
 * @param {String} filterObj.userName: filter the scadas that userName can access
 *  }
 */

function _insertEventLog (eventLogObj, trans) {
  let eventName = eventLogObj.eventName;
  let scadaId = eventLogObj.scadaId;

  // clone object
  let eventLogs = Object.assign({}, eventLogObj);
  delete eventLogs.eventLogRecord;

  let eventLogRecords = eventLogObj.eventLogRecord;

  for (let record of eventLogRecords) {
    record.eventName = eventName;
    record.scadaId = scadaId;
  }

  // create EventLog and EventLogRecord
  return eventLogVo.create(eventLogs, {transaction: trans}).then((_eventLog) => {
    return eventLogRecordVo.bulkCreate(eventLogRecords, {transaction: trans}).then((records) => {
      // convert the key name to match model field keys, only bulkCreate need to do that.
      let _records = records.map((_record) => {
        let obj = {};
        for (let key in _record.dataValues) {
          if (eventLogRecordMapper[key]) {
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
  } else {
    sql.field('EventLog.scada_id', 'scadaId');
    sql.field('EventLog.event_name', 'eventName');
  }
  sql.distinct();
  if (filterObj.userName) {
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
    _sequelize.query(sql.toString(), { type: _sequelize.QueryTypes.SELECT, model: eventLogVo }).then((raws) => {
      resolve({count: raws.length, rows: raws.slice(offset, limit ? limit + offset : raws.length)});
    }).catch((err) => {
      reject(err);
    });
  });
}

module.exports = {
  init: _init,
  insertEventLog: _insertEventLog,
  getEventLogList: _getEventLogList
};