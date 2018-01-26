'use strict';

const Promise = require('bluebird');
const Utils = require('../common/utils');
var squel = require('squel').useFlavour('postgres');

var projectVo = null;
var scadaVo = null;
var userAllowDeviceVo = null;
var scadaDao = require('./scadaDao');
var _sequelize = null;
var mapper = {};

function _init (sequelize) {
  projectVo = sequelize.import('../models/projectVo');
  scadaVo = sequelize.import('../models/scadaVo');
  userAllowDeviceVo = sequelize.import('../models/userAllowDeviceVo');
  _sequelize = sequelize;
  for (let key in projectVo.attributes) {
    mapper[projectVo.attributes[key].field] = key;
  }
}

/**
 * @param {Object} filterObj
 * @param {Integer} filterObj.offset: starting index
 * @param {Integer} filterObj.limit: data retrived
 * @param {String} filterObj.projectId: filter project name
 * @param {String} filterObj.description: filter project desc
 * @param {String} filterObj.sortby: sort properties
 * @param {String} filterObj.order: order asc or not
 * @param {Boolean} filterObj.detail: select id & name only
 * @param {String} filterObj.userName: filter the projects that userName can access
 *  }
 */

function _getProjectList (filterObj = {}) {
  let offset = filterObj.offset ? filterObj.offset : 0;
  let limit = filterObj.limit ? filterObj.limit : null;
  let sortby = filterObj.sortby ? filterObj.sortby : 'projectId';
  let order = filterObj.order !== null ? filterObj.order : true;
  let detail = filterObj.detail ? filterObj.detail : false;

  let sql = squel.select().from('scada.project_list', 'Project');
  if (detail) {
    for (let idx in projectVo.attributes) {
      sql.field('Project.' + projectVo.attributes[idx].field, idx);
    }
  } else {
    sql.field('Project.proj_id', 'projectId');
  }
  sql.distinct();
  if (filterObj.userName) {
    sql.join('scada.user_allow_device', 'UserAllowDevice', squel.expr().and('Project.proj_id = UserAllowDevice.proj_id'));
    sql.join('scada.user_info', 'UserInfo', squel.expr().and('UserAllowDevice.user_id = UserInfo.user_id'));
    sql.where('Userinfo.user_name = ?', filterObj.userName);
  }
  for (let idx in projectVo.attributes) {
    let key = projectVo.attributes[idx];
    if (!Utils.isNullOrUndefined(filterObj[idx])) {
      sql.where('Project.' + key.field + ' LIKE ?', filterObj[idx]);
    }
  }
  sql.order(sortby, order);
  return new Promise((resolve, reject) => {
    _sequelize.query(sql.toString(), { type: _sequelize.QueryTypes.SELECT, model: projectVo }).then((raws) => {
      resolve({count: raws.length, rows: raws.slice(offset, limit ? limit + offset : raws.length)});
    }).catch((err) => {
      reject(err);
    });
  });
}

function _getProject (projectId) {
  return projectVo.findOne({ where: { projectId } });
}

function _insertProject (projects, trans) {
  // return projectVo.create(project, { transaction: trans });
  if (Array.isArray(projects)) {
    return projectVo.bulkCreate(projects, { transaction: trans }).then((array) => {
      return Promise.mapp(array, (project) => {
        let obj = {};
        for (let key in project.dataValues) {
          if (mapper[key]) {
            obj[mapper[key]] = project.dataValues[key];
          }
        }
        return obj;
      });
    });
  } else {
    return projectVo.create(projects, { transaction: trans });
  }
}

function _updateProject (projectId, project, trans) {
  return projectVo.update(project, { where: { projectId }, transaction: trans }).then(function (c) {
    if (project.projectId && project.projectId !== projectId) {
      return scadaVo.update({ projectId: project.projectId }, { where: { projectId }, transaction: trans }).then((result) => {
        return userAllowDeviceVo.update({ projectId: project.projectId }, { where: { projectId }, transaction: trans });
      });
    }
  });
}

function _deleteProject (projectId, trans) {
  let promises = [];
  return scadaVo.findAll({where: {projectId}}).then(function (scadas) {
    for (let idx in scadas) {
      promises.push(scadaDao.deleteScada(scadas[idx].scadaId, trans));
    }
    promises.push(projectVo.destroy({ where: { projectId }, transaction: trans }));
    promises.push(userAllowDeviceVo.destroy({ where: { projectId }, transaction: trans }));
    return Promise.all(promises);
  });
}

function _checkProjectRightByUserName (userName, filterObj = {}) {
  let sql = squel.select().from('scada.project_list', 'Project');
  sql.field('Project.proj_id', 'projectId');
  sql.field('SUB.userId', 'userId');
  sql.distinct();
  sql.left_join(squel.select().from('scada.user_allow_device', 'UserAllowDevice')
  .field('UserAllowDevice.user_id', 'userId').field('UserAllowDevice.proj_id', 'projectId')
  .join('scada.user_info', 'UserInfo', squel.expr().and('UserAllowDevice.user_id = UserInfo.user_id').and('Userinfo.user_name = ?', userName)), 'SUB', 'SUB.projectId = Project.proj_id');
  /* if (filterObj.projectId) {
    sql.where(('UserAllowDevice.proj_id = ?', filterObj.projectId));
  }
  if (filterObj.scadaId) {
    sql.where(('UserAllowDevice.scada_id = ?', filterObj.scadaId));
  }
  if (filterObj.deviceId) {
    sql.where(('UserAllowDevice.device_id = ?', filterObj.deviceId));
  } */

  return new Promise((resolve, reject) => {
    _sequelize.query(sql.toString(), { type: _sequelize.QueryTypes.SELECT, model: userAllowDeviceVo }).then((raws) => {
      resolve(raws);
    }).catch((err) => {
      reject(err);
    });
  });
}

module.exports = {
  init: _init,
  getProjectList: _getProjectList,
  getProject: _getProject,
  insertProject: _insertProject,
  updateProject: _updateProject,
  deleteProject: _deleteProject,
  checkProjectRightByUserName: _checkProjectRightByUserName
};
