'use strict';

const DBManager = require('./index.js');

/* const psqlConfig = {
  hostname: '52.175.25.104',
  port: 5432,
  username: 'bdcb4d33-ed2a-49e0-ae2f-2eeaaae5b630',
  password: '3n2o3gq7mamtg63anu64luves3',
  database: 'ef91ff67-3b3e-4c47-9091-fa24ad062c0d'
}; */

const psqlConfig = {
  hostname: '172.16.12.119',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'wisepaas'
}

const scada = {
  scadaId: 'ada43195-7a0a-4903-a533-d333d8c5f9d9'
};

DBManager.init(psqlConfig);
var scadaDao = DBManager.ScadaDao;
var deviceDao = DBManager.DeviceDao;
var tagDao = DBManager.TagDao;
var userDao = DBManager.UserDao;
var scopeDao = DBManager.ScopeDao;
var projectDao = DBManager.ProjectDao;

let projectId = 'reqwer';
let scadaId = 'test';
let deviceId = 'test';
let tagName = 'test';

tagDao.getTag(scadaId, deviceId, tagName).then((result) => {
  if(result) {
    console.log('Create Tags Successfully');
    tagDao.deleteTag(scadaId, deviceId, tagName).then((result) => {
      tagDao.getTag(scadaId, deviceId, tagName).then((result) => {
        if(!result){
          console.log('Delete Tags Successfully');
        }
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  } else {
    console.log('Create Tags failed');
  }
}).catch((err) => {
  console.log(err);
});


/* deviceDao.getDevice(scadaId, deviceId).then((result) => {
  if (result && result.dataValues) {
    console.log('Create Device Successfully');
    tagDao.getWholeTagListByDeviceId(scadaId, deviceId).then((result) => {
      if (result && result.analogTagList.length > 0 && result.discreteTagList.length > 0 && result.textTagList.length > 0) {
        console.log('Create Tags Successfully');
        deviceDao.deleteDevice(scadaId, deviceId).then((result) => {
          deviceDao.getDevice(scadaId, deviceId).then((result) => {
            if (!result) {
              console.log('Delete Device Successfully');
              tagDao.getWholeTagListByDeviceId(scadaId, deviceId).then((result) => {
                if (result && result.analogTagList.length === 0 && result.discreteTagList.length === 0 && result.textTagList.length === 0) {
                  console.log('Delete Tags Successfully');
                } else {
                  console.log('Delete Tags failed');
                }
              }).catch((err) => {
                console.log(err);
              });
            } else {
              console.log('Delete Device failed');
            }
          }).catch((err) => {
            console.log(err);
          });
        }).catch((err) => {
          console.log(err);
        });
      } else {
        console.log('Create Tags failed');
      }
    }).catch((err) => {
      console.log(err);
    });
  } else {
    console.log('Create Device failed');
  }
}).catch((err) => {
  console.log(err);
});

/*scadaDao.getScada(null, scadaId).then((result) => {
  if (result && result.dataValues) {
    console.log('Create Scada Successfully');
    deviceDao.getDeviceListByScadaId(scadaId).then((result) => {
      if (result && result.length > 0) {
        console.log('Create Device Successfully');
        tagDao.getWholeTagListByScadaId(scadaId).then((result) => {
          if (result && result.analogTagList.length > 0 && result.discreteTagList.length > 0 && result.textTagList.length > 0) {
            console.log('Create Tags Successfully');
            scadaDao._deleteScada(scadaId).then((result) => {
              scadaDao.getScada(null, scadaId).then((result) => {
                if (!result) {
                  console.log('Delete Scada Successfully');
                  deviceDao.getDeviceListByScadaId(scadaId).then((result) => {
                    if (result && result.length === 0) {
                      console.log('Delete Device Successfully');
                      tagDao.getWholeTagListByScadaId(scadaId).then((result) => {
                        if (result && result.analogTagList.length === 0 && result.discreteTagList.length === 0 && result.textTagList.length === 0) {
                          console.log('Delete Tags Successfully');
                        } else {
                          console.log('Delete Tags failed');
                        }
                      }).catch((err) => {
                        console.log(err);
                      });
                    } else {
                      console.log('Delete Device failed');
                    }
                  }).catch((err) => {
                    console.log(err);
                  });
                } else {
                  console.log('Delete Scada failed');
                }
              }).catch((err) => {
                console.log(err);
              });
            }).catch((err) => {
              console.log(err);
            });
          } else {
            console.log('Create Tags failed');
          }
        }).catch((err) => {
          console.log(err);
        });
      } else {
        console.log('Create Device failed');
      }
    });
  } else {
    console.log('Create Scada failed');
  }
}).catch((err) => {
  console.log(err);
});

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
