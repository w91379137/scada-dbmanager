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
let scadaId = '71c957bc-b5b1-4e02-8087-b06cc44baf74';
let deviceId = 'test';
let tagName = 'test';

let eventLogInfo = {
  "eventName": "string13",
  "scadaId": "string",
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
    {
      "recordDeviceId": "string",
      "recordTagName": "string"
    },
    {
      "recordDeviceId": "string1",
      "recordTagName": "string1"
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


eventLogDao.getEventLogList()
.then((result) => {
  console.log(result);
})
.catch((error) => {
  console.error(error);
});