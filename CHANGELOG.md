# [Unrelease]
## Fixed
- 修正insertDiscreteTag新增失敗的問題
## Changed
- 改寫create的方式，統一用bulkCreate來做，影響到以下三個function
    - insertTextTag
    - insertAlarmAnalogTag
    - insertAlarmDiscreteTag
## Others
- 新增tagDao測試程式 (test/tagDaoTest.js)
    - insertDiscreteTag
    - insertTextTag
    - insertAlarmAnalogTag
    - insertAlarmDiscreteTag
# [1.0.25]
## Fixed
- createUser bug
- SysParams bug

# [1.0.24]
## Fixed
- create user bug

# [1.0.23]
## Added
- Postgres connection setting

## Fixed
- createUser bug

# [1.0.22] - 2018-01-24
## Added
- tagDao
    - getTagListWithFilter
    - getAnalogList
    - getDiscreteList

# [1.0.21] - 2018-01-23
## Fixed
- typo

# [1.0.20] - 2018-01-23
## Added
- SysParam model
- Role
    - getRoleList
    - getRole
- Support bulkCreate
    - projectDao
    - scadaDao
    - deviceDao
    - tagDao

## Changed
- postgres config rename hostname as host
- User
    - getUserList
    - getUserById
    - getUserByName
    - insertUser

# [1.0.19] - 2018-01-17
## Fixed
- filter order init
- update tag alarm

# [1.0.18]
## Fixed
- `ScadaDao.bindScada`: if user have new project access right, then update projectId = new projectId, or delete the scada access right

# [1.0.17] - 2017-12-26
## Changed
- `TagDao.getTag`: add alarm info

# [1.0.16] - 2017-12-25
## Fixed
- typo

# [1.0.15] - 2017-12-21
## Changed
- DeviceDao.getDeviceList: add project filter

## Fixed
- TagDao.getTag

# [1.0.14] - 2017-12-19
## Added
- DeviceDao
    - deleteDeviceByScadaId: delete devices belongs to scadaId
- Add configUploaded property

## Changed
- device type is adjusted to String