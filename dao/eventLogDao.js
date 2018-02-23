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
  // 取出紀錄測點和事件測點共用的資料，例如scada_id, event_name
  // 先把紀錄測點從eventLogObj切割出來
  // 判斷type是什麼，
  if (!Array.isArray(scadas)) {
    scadas = [scadas];
  }
  // return scadaVo.bulkCreate(scadas, {transaction: trans}).then((array) => {
  //   return Promise.map(array, (scada) => {
  //     let obj = {};
  //     for (let key in scada.dataValues) {
  //       if (mapper[key]) {
  //         obj[mapper[key]] = scada.dataValues[key];
  //       }
  //     }
  //     return obj;
  //   });
  // });
}

module.exports = {
  init: _init,
  insertEventLog: _insertEventLog
};
