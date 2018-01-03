'use strict';

const Promise = require('bluebird');

const ProjectDao = require('../dao/projectDao');
const ScadaDao = require('../dao/scadaDao');
const DeviceDao = require('../dao/scadaDao');
const TagDao = require('../dao/tagDao');
const AnalogTagDao = require('../dao/analogTagDao');
const DiscreteTagDao = require('../dao/discreteTagDao');
const TextTagDao = require('../dao/textTagDao');
const AlarmAnalogTagDao = require('../dao/alarmAnalogTagDao');
const AlarmDiscreteTagDao = require('../dao/alarmDiscreteTagDao');
const UserDao = require('../dao/userDao');
const UserAllowDeviceDao = require('../dao/userAllowDeviceDao');

const projectVo = require('../models/projectVo');

var _sequelize = null;

function _init (sequelize) {
  _sequelize = sequelize;
}

/**
* @param {Object} filterObj
* @param {Integer} filterObj.offset: starting index
* @param {Integer} filterObj.limit: data retrived
* @param {String} filterObj.sortby: sort properties
* @param {String} filterObj.order: order asc or not
* @param {Boolean} filterObj.detail: select id & name only
* @param {String} filterObj.userName: filter the project that userName can access
*  }
*/
function _getProjectList (filterObj = {}) {
  try {
    let offset = filterObj.offset ? filterObj.offset : 0;
    let limit = filterObj.limit ? filterObj.limit : null;
    let _option = {
      sortby: filterObj.sortby ? filterObj.sortby : 'projectId',
      order: filterObj.order ? filterObj.order : true,
      detail: filterObj.detail ? filterObj.detail : false,
      userName: filterObj.userName ? filterObj.userName : null
    };
    let filter = {};
    for (let idx in projectVo.attributes) {
      let obj = projectVo.attributes[idx];
      if (filterObj[obj.fieldName]) {
        filter[obj.field] = filterObj[obj.fieldName];
      }
    }
    return ProjectDao.getProjectList(filter, _option).then((raws) => {
      return Promise.resolve({count: raws.length, rows: raws.slice(offset, limit ? limit + offset : raws.length)});
    });
  } catch (err) {
    Promise.reject(err);
  }
}

/**
 * @param {String} projectId: select projectId
 * @param {Object} option
 * @param {String} option.userName: userName
 */
function _getProject (projectId, option = {}) {
  try {
    let _option = {
      sortby: 'projectId',
      order: true,
      detail: true,
      userName: option.userName,
      projectId
    };
    return ProjectDao.getProjectList({}, _option).then((raws) => {
      return Promise.resolve(raws);
    });
  } catch (err) {
    return Promise.reject(err);
  }
  // return ProjectDao.getProject(projectId);
}

/**
 * @param {Object} project: insert project instance
 * @param {Object} option
 * @param {String} option.userName: create userName
 */
function _insertProject (project = {}, option = {}, trans) {
  let res = null;
  return _sequelize.transaction((trans) => {
    return ProjectDao.insertProject(project, trans).then((proj) => {
      res = proj;
      if (option.userName) {
        return UserDao.getUserByName(option.userName).then((user) => {
          if (!user) {
            throw new Error('userName is not exist');
          }
          return UserAllowDeviceDao.insertAccessRight([{userId: user.userId, projectId: proj.projectId}], trans);
        });
      }
    });
  }).then((result) => {
    return Promise.resolve(res);
  });
}

/**
 * @param {String} projectId: update projectId
 * @param {Object} project: update project instance
 * @param {Object} option
 * @param {String} option.userName: update userName
 */
function _updateProject (projectId, project = {}, option = {}, trans) {
  let promises = [];
  if (option.userName) {
    promises.push(ProjectDao.getProjectsRightByUserName(option.userName));
  }
  return Promise.all(promises).then((res) => {
    let o = res.find((r) => r.projectId === projectId);
    if (!o) {
      return Promise.reject(Error('result not found'));
    }
    if (!o.userId) {
      return Promise.reject(Error('Permission denied'));
    }
    promises = [];
    promises.push(ProjectDao.updateProject({projectId}, project, trans));
    if (project.projectId && project.projectId !== projectId) {
      promises.push(ScadaDao.updateScada({projectId}, {projectId: project.projectId}));
      promises.push(UserAllowDeviceDao.updateAccessRight({projectId}, {projectID: project.projectId}));
    }
    return Promise.all(promises);
  });
}

/**
 * @param {String} project: delete projectId
 * @param {Object} option
 * @param {String} option.userName: delete userName
 */
function _deleteProject (projectId, option = {}, trans) {
  let promises = [];
  if (option.userName) {
    promises.push(ProjectDao.getProjectsRightByUserName(option.userName));
    promises.push(ScadaDao.getScadasRightByUserName(option.userName));
    promises.push(DeviceDao.getDevicesRightByUserName(option.userName));
  }
  return Promise.all(promises).then((result) => {
    let res = [];
    for (let idx in result) {
      res = res.concat(result[idx]);
    }
    if (res.length) {
      let raws = res.filter((raw) => raw.projectId === projectId);
      for (let idx in raws) {
        if (!raws[idx].userId) {
          return Promise.reject(Error('Permission denied'));
        }
      }
    }
    return _sequelize.transaction((trans) => {
      let promises = [];
      promises.push(ProjectDao.deleteProject({projectId}, trans));
      promises.push(ScadaDao.deleteScada({projectId}, trans));
      promises.push(DeviceDao.deleteDevice({projectId}, trans));
      promises.push(TagDao.deleteTag({projectId}, trans));
      promises.push(AnalogTagDao.deleteTag({projectId}, trans));
      promises.push(DiscreteTagDao.deleteTag({projectId}, trans));
      promises.push(TextTagDao.deleteTag({projectId}, trans));
      promises.push(AlarmAnalogTagDao.deleteTag({projectId}, trans));
      promises.push(AlarmDiscreteTagDao.deleteTag({projectId}, trans));
      promises.push(UserAllowDeviceDao.deleteAccessRight({projectId}, trans));
      return Promise.all(promises);
    }).then((result) => {
      return Promise.resolve();
    });
  });
}

function __hasWholeProjectAccessRight (projectId, userName) {
  return new Promise((resolve, reject) => {
    let promises = [];
    promises.push(ProjectDao.getProjectsRightByUserName(userName, {projectId}));
    promises.push(ScadaDao.getScadasRightByUserName(userName, {projectId}));
    promises.push(DeviceDao.getDevicesRightByUserName(userName, {projectId}));
    return Promise.all(promises).then((result) => {
      let res = [];
      for (let idx in result) {
        res = res.concat(result[idx]);
      }
      let raws = res.filter((raw) => raw.projectId === projectId);
      for (let idx in raws) {
        if (!raws[idx].userId) {
          return resolve(false);
        }
      }
      return resolve(true);
    });
  });
}

module.exports = {
  init: _init,
  getProjectList: _getProjectList,
  getProject: _getProject,
  insertProject: _insertProject,
  updateProject: _updateProject,
  deleteProject: _deleteProject
};
