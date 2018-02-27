'use strict';


const DBManager = require('../index.js');
const uuidV4 = require('uuid/v4');

const psqlConfig = {
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'postgres'
};

DBManager.init(psqlConfig);
var eventLogDao = DBManager.EventLogDao;
// let scadaDao = DBManager.scadaDao;

let projectId = 'reqwer';
// let scadaId = '71c957bc-b5b1-4e02-8087-b06cc44baf74';
let deviceId = 'test';
let tagName = 'test';

let eventLogInfo = {
  "eventName": "eventName_1",
  "scadaId": "scadaId_1",
  "description": "string",
  "deviceId": "string",
  "tagName": "string",
  "eventType": 0,
  "refValue": 0,
  "refDeviceId": "string",
  "refTagName": "string",
  "sampleInterval": 0,
  "sampleUnit": 0,
  "sampleAmount": 0,
  "eventLogRecord": [
    {"deviceId": "device_1", "tagName": "tagName_1"},
    {"deviceId": "device_2", "tagName": "tagName_2"}
  ]
};

let updateObj = {
  "eventName": "testset",
  "description": "string",
  "eventType": 0,
  "refValue": 0,
  "refDeviceId": "string",
  "refTagName": "string",
  "sampleInterval": 0,
  "sampleUnit": 0,
  "sampleAmount": 0,
  "eventLogRecord": [
    {
      "tagName": "string",
      "deviceId":"test2"
    }
  ]
};

// DBManager.conn().transaction().then(function (trans) {
//   return eventLogDao.insertEventLog(eventLogInfo, trans).then(function (res) {
//     return trans.commit();
//   }).catch(function (err) {
//     if (err) {
//       console.log(err);
//       return trans.rollback();
//     }
//   });
// });

// let filterObj = {
//   scadaId: 'string',
//   eventName: 'string1',
//   detail: false
// };

// eventLogDao.getEventLogList(filterObj)
// .then((result) => {
//   console.log(result);
// })
// .catch((error) => {
//   console.error(error);
// });

// ------------- update ---------------
// let prevScadaId = 'scadaId_1';
// let prevEventName = 'testset';


// DBManager.conn().transaction().then(function (trans) {
//   return eventLogDao.updateEventLog(prevScadaId, prevEventName, updateObj, trans).then(function (res) {
//     return trans.commit();
//   }).catch(function (err) {
//     if (err) {
//       console.log(err);
//       return trans.rollback();
//     }
//   });
// });

// -------------------- delete ----------

let scadaId = 'scadartyrtyId_1';
let eventName = '';

DBManager.conn().transaction().then(function (trans) {
  return eventLogDao.deleteEventLog(scadaId, eventName, trans).then(function (res) {
    return trans.commit();
  }).catch(function (err) {
    if (err) {
      console.log(err);
      return trans.rollback();
    }
  });
});
