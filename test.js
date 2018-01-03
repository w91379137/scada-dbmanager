'use strict';

const DBManager = require('./index.js');

const psqlConfig = {
  hostname: 'wacloud',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'wisepaas'
}

const scada = {
  scadaId: 'ada43195-7a0a-4903-a533-d333d8c5f9d9'
};

DBManager.init(psqlConfig);
/* var scadaDao = DBManager.ScadaDao;
var deviceDao = DBManager.DeviceDao;
var tagDao = DBManager.TagDao;
var userDao = DBManager.UserDao;
var scopeDao = DBManager.ScopeDao;
var roleDao = DBManager.RoleDao;
var userAllowDeviceDao = DBManager.UserAllowDeviceDao; */
var ProjectTrx = DBManager.ProjectTrx;

let projectId = 'reqwer';
let scadaId = '71c957bc-b5b1-4e02-8087-b06cc44baf74';
let deviceId = 'test';
let tagName = 'test';

let project = {
  projectId: 'testtttt',
  description: ''
};

ProjectTrx.insertProject(project).then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err);
})

/* scadaDao.deleteScadaByScadaId('test').then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err);
}) */

/* scadaDao.bindScadas([{projectId: projectId, scadaId: scadaId}]).then((result) => {
  console.log(result);
})
.catch((error) => {
  console.error(error);
}); */

/* projectDao.getProject('test')
.then((result) => {
  console.log(result);
})
.catch((error) => {
  console.error(error);
}); */

/* scadaDao.getScadaList()
.then((result) => {
  console.log(result);
})
.catch((error) => {
  console.error(error);
});

scadaDao.getScada(scada.scadaId)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  }); */

/* tagDao.getTagListByScadaId(scada.scadaId)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

tagDao.getWholeTagListByScadaId(scada.scadaId)
.then((result) => {
  console.log(result);
})
.catch((error) => {
  console.error(error);
});

let user = {
  'userName': 'string87',
  'email': 'test@advantech.com.tw',
  'ssoRole': 'test',
  'userDesc': 'string'
};

/* userDao.updateUserByName(user.userName, {scope: ['吃大便']}).then((result) => {
  console.log(result);
})
.catch((error) => {
  console.error(error);
}); */

/* scopeDao.insertScope({scopeName: '吃大便'}).then((result) => {
  console.log("here");
  console.log(result);
})
.catch((error) => {
  console.error(error);
}); */

/* DBManager.conn().transaction(function (trans) {
  return userDao.insertUser(user, trans);
}).then(function (data) {
  console.log(data);
}).catch(function (err) {
  console.error(err.message);
}); */

/* DBManager.conn().transaction(function (trans) {
  return userDao.insertUserScope(1, ['test'], trans);
}).then(function (data) {
  console.log(data);
}).catch(function (err) {
  console.error(err.message);
}); */

/* userDao.getUserList().then((result) => {
  console.log(result);
})
.catch((error) => {
  console.error(error);
}); */

/* scopeDao.insertScope({scopeName: 'test'}).then(function (data) {
  console.log(data);
})
.catch(function (err) {
  console.error(err.message);
}); */
/* userDao.insertUserScope(3, [3]).then(function (data) {
  console.log(data);
})
.catch(function (err) {
  console.error(err.message);
}); */

/* DBManager.conn().transaction(function (trans) {
  return userDao.insertUser(user, trans);
})
.then(function (data) {
  console.log(data);
})
.catch(function (err) {
  console.error(err.message);
}); */

/* let scadaInfo = {
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
  return scadaDao.insertScada(scadaInfo, trans).then(function (scada) {
    return deviceDao.insertDevice(deviceInfo, trans).then(function (device) {
      return tagDao.insertTag(tagInfo, trans);
    });
  });
})
.then(function (data) {
  console.log(data);
})
.catch(function (err) {
  console.error(err.message);
}); */
