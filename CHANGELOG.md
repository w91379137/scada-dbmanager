# [Unrelease]
## Added
- ProjectTrx
    - init
    - getProjectList(filter)
    - getProject(projectId, option)
    - insertProject(project, option)
    - updateProject(projectId, project, option)
    - deleteProject(projectId, option)

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