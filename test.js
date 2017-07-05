'use strict';

const DBManager = require('./index.js');

const psqlConfig = {
  hostname: '172.16.12.211',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'wisepaas'
};

const scada = {
  scadaId: 'ada43195-7a0a-4903-a533-d333d8c5f9d9'
};

let dbmanager = new DBManager(psqlConfig);
let scadaDao = dbmanager.scadaDao;
let deviceDao = dbmanager.deviceDao;
let tagDao = dbmanager.tagDao;

scadaDao.getScadaDataById(scada.scadaId)
  .then((result) => {
    // console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

let scadaInfo = {
  scadaId: 'ada43195-7a0a-4903-a533-d333d8c5f9f1',
  name: 'scadafoo',
  description: 'scadafoo',
  primaryIP: '127.0.0.1',
  primaryPort: 80,
  backupIP: '',
  backupPort: 0,
  type: 1
};

let deviceInfo = {
  scadaId: 'ada43195-7a0a-4903-a533-d333d8c5f9f1',
  deviceId: 'P01_devicefoo',
  name: 'devicefoo',
  comportNbr: 1,
  description: 'devicefoo',
  ip: '127.0.0.1',
  port: 0,
  type: 1
};

let tagInfo = {
  scadaId: 'ada43195-7a0a-4903-a533-d333d8c5f9f1',
  deviceId: 'P01_devicefoo',
  name: 'tagfoo',
  description: 'tagfoo',
  alarmStatus: true,
  type: 1
};

dbmanager.conn.transaction(function (trans) {
  return scadaDao.insertScadaData(scadaInfo, trans).then(function (scada) {
    return deviceDao.insertDeviceData(deviceInfo, trans).then(function (device) {
      return tagDao.insertTagData(tagInfo, trans);
    });
  });
})
.then(function (data) {
  console.log(data);
})
.catch(function (err) {
  console.error(err.message);
});
