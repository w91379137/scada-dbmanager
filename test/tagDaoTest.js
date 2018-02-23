'use strict';
// test item
// 1. insertDiscreteTag
// 2. insertTextTag
// 3. insertAlarmAnalogTag
// 4. insertAlarmDiscreteTag

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
var tagDao = DBManager.TagDao;

let projectId = 'reqwer';
let scadaId = '71c957bc-b5b1-4e02-8087-b06cc44baf74';
let deviceId = 'test';
let tagName = 'test';

let state0 = 6;

let dtInfo = {
  scadaId,
  deviceId,
  tagName,
  state0
};

let ttInfo = {
  scadaId,
  deviceId,
  tagName
};

let ttInfoArr = [
  {
    scadaId,
    deviceId,
    tagName: 'test1'
  },
  {
    scadaId,
    deviceId,
    tagName: 'test2'
  },
  {
    scadaId,
    deviceId,
    tagName: 'test3'
  }
];

let aatInfo = {
  scadaId,
  deviceId,
  tagName,
  hhPriority: 0,
  hhAlarm: 0,
  hiPriority: 0,
  hiAlarm: 0,
  loPriority: 0,
  loAlarm: 0,
  llPriority: 0,
  llAlarm: 0
};

let aatInfoArr = [
  {
    scadaId,
    deviceId,
    tagName: 'test1',
    hhPriority: 0,
    hhAlarm: 0,
    hiPriority: 0,
    hiAlarm: 0,
    loPriority: 0,
    loAlarm: 0,
    llPriority: 0,
    llAlarm: 0
  },
  {
    scadaId,
    deviceId,
    tagName: 'test2',
    hhPriority: 0,
    hhAlarm: 0,
    hiPriority: 0,
    hiAlarm: 0,
    loPriority: 0,
    loAlarm: 0,
    llPriority: 0,
    llAlarm: 0
  }
];

let adtInfo = {
  scadaId,
  deviceId,
  tagName,
  alarmPriority0: 0,
  alarmPriority1: 0,
  alarmPriority2: 0,
  alarmPriority3: 0,
  alarmPriority4: 0,
  alarmPriority5: 0,
  alarmPriority6: 0,
  alarmPriority7: 0
};

let adtInfoArr = [
  {
    scadaId,
    deviceId,
    tagName: 'test1',
    alarmPriority0: 0,
    alarmPriority1: 0,
    alarmPriority2: 0,
    alarmPriority3: 0,
    alarmPriority4: 0,
    alarmPriority5: 0,
    alarmPriority6: 0,
    alarmPriority7: 0
  },
  {
    scadaId,
    deviceId,
    tagName: 'test2',
    alarmPriority0: 0,
    alarmPriority1: 0,
    alarmPriority2: 0,
    alarmPriority3: 0,
    alarmPriority4: 0,
    alarmPriority5: 0,
    alarmPriority6: 0,
    alarmPriority7: 0
  },
  {
    scadaId,
    deviceId,
    tagName: 'test3',
    alarmPriority0: 0,
    alarmPriority1: 0,
    alarmPriority2: 0,
    alarmPriority3: 0,
    alarmPriority4: 0,
    alarmPriority5: 0,
    alarmPriority6: 0,
    alarmPriority7: 0
  }
];

// DBManager.conn().transaction().then(function (trans) {
//   return tagDao.insertDiscreteTag(dtInfoArr, trans).then(function (res) {
//     return trans.commit();
//   }).catch(function (err) {
//     if (err) {
//       console.log(err);
//       return trans.rollback();
//     }
//   });
// });

// DBManager.conn().transaction().then(function (trans) {
//   return tagDao.insertTextTag(ttInfoArr, trans).then(function (res) {
//     return trans.commit();
//   }).catch(function (err) {
//     if (err) {
//       console.log(err);
//       return trans.rollback();
//     }
//   });
// });

// DBManager.conn().transaction().then(function (trans) {
//   return tagDao.insertAlarmAnalogTag(aatInfoArr, trans).then(function (res) {
//     return trans.commit();
//   }).catch(function (err) {
//     if (err) {
//       console.log(err);
//       return trans.rollback();
//     }
//   });
// });

DBManager.conn().transaction().then(function (trans) {
  return tagDao.insertAlarmDiscreteTag(adtInfoArr, trans).then(function (res) {
    return trans.commit();
  }).catch(function (err) {
    if (err) {
      console.log(err);
      return trans.rollback();
    }
  });
});