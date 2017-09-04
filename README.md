# scada-dbmanager

scada-dbmanager is a utility of EI-PaaS SCADA for database management.

## Installation

`npm install scada-dbmanager`

### Initial

```js
const DBManager = require('scada-dbmanager');
let conf = {
  hostname: '127.0.0.1',
  port: 5432,
  username: 'admin',
  password: '1234',
  database: 'postgres'
};
DBManager.init(conf);

```

## API
<a name="DBManager"></a>
### DBManager
- `init(postgresConf)`
- `conn()` get sequelize
- `ScadaDao`
- `DeviceDao`
- `TagDao`
- `UserDao`

<a name="scadaDao"></a>
### scadaDao
- `getScadaList`
- `getScada(scadaId)`
- `insertScada(scadaObj, transaction)`
- `updateScada(scadaObj, scadaId, transaction)`
- `deleteScada(scadaId, transaction)`

<a name="deviceDao"></a>
### deviceDao
- `getDevice(scadaId, deviceId)`
- `getDeviceListByScadaId(scadaId)`
- `insertDevice(deviceObj, transaction)`
- `updateDevice(deviceObj, scadaId, deviceId, transaction)`
- `deleteDevice(scadaId, deviceId, transaction)`
- `deleteDeviceListByScadaId(scadaId, transaction)`

<a name="tagDao"></a>
### tagDao
- `getTag(scadaId, deviceId, tagName)`
- `getTagListByScadaId(scadaId)`
- `getTagListBydeviceId(scadaId, deviceId)`
- `getAnalogTag(scadaId, deviceId, tagName)`
- `getDiscreteTag(scadaId, deviceId, tagName)`
- `getTextTag(scadaId, deviceId, tagName)`
- `getAlarmAnalogTag(scadaId, deviceId, tagName)`
- `getAlarmDiscreteTag(scadaId, deviceId, tagName)`
- `insertTag(tagObj, transaction)`
- `insertAnalogTag(tagObj, transaction)`
- `insertDiscreteTag(tagObj, transaction)`
- `insertTextTag(tagObj, transaction)`
- `insertAlarmAnalogTag(tagObj, transaction)`
- `insertAlarmDiscreteTag(tagObj, transaction)`
- `updateTag(tagObj, scadaId, deviceId, tagName, transaction)`
- `updateAnalogTag(tagObj, scadaId, deviceId, tagName, transaction)`
- `updateDiscreteTag(tagObj, scadaId, deviceId, tagName, transaction)`
- `updateTextTag(tagObj, scadaId, deviceId, tagName, transaction)`
- `updateAlarmAnalogTag(tagObj, scadaId, deviceId, tagName, transaction)`
- `updateAlarmDiscreteTag(tagObj, scadaId, deviceId, tagName, transaction)`
- `deleteTagListByScadaId(scadaId, transaction)`
- `deleteTagListByDeviceId(scadaId, deviceId, transaction)`
- `deleteTag(scadaId, deviceId, tagName, transaction)`
- `deleteAlarmTag(scadaId, deviceId, tagName, type, transaction)`

<a name="userDao"></a>
### userDao
- `getUserList()`
- `getUserById(userId)`
- `getUserByName(userName)`
- `getUserScopeById(userId)`
- `insertUser(userObj, trans)`
- `insertUserScopeById(userId, scopeList, trans)`
- `updateUserByName(userName, userObj, trans)`
- `updateUserScopeByName(userName, scopeList, trans)`
- `updateUserScopeById(userId, scopeList, trans)`
- `deleteUserById(userId, trans)`
- `deleteUserScope(userId, trans)`

## Example
### get scada list
```js
const DBManager = require('scada-dbmanager');
let conf = {
  hostname: '127.0.0.1',
  port: 5432,
  username: 'admin',
  password: '1234',
  database: 'postgres'
};
DBManager.init(conf);
var scadaDao = DBManager.ScadaDao;
scadaDao.getScadaList().then((result) => {
  console.log(result);
}).catch((error) => {
  console.error(error);
});

```
