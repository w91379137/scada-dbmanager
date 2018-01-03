'use strict';

const Promise = require('bluebird');
var squel = require('squel').useFlavour('postgres');

var projectVo = null;
var scadaVo = null;
var userAllowDeviceVo = null;
var _sequelize = null;

function _init (sequelize) {
  projectVo = sequelize.import('../models/projectVo');
  scadaVo = sequelize.import('../models/scadaVo');
  userAllowDeviceVo = sequelize.import('../models/userAllowDeviceVo');
  _sequelize = sequelize;
}

/**
 * @param {Object} filterObj
 * @param {Object} option
 * @param {String} option.sortby: sort properties
 * @param {String} option.order: order asc or not
 * @param {Boolean} option.detail: select id & name only
 * @param {String} option.userName: filter the projects that userName can access
 * @param {String} option.projectId: filter the projectId
 *  }
 */

function _getProjectList (filter = {}, {sortby, order, detail, userName, projectId}) {
  let sql = squel.select().from('scada.project_list', 'Project');
  if (detail) {
    for (let idx in projectVo.attributes) {
      sql.field('Project.' + projectVo.attributes[idx].field, idx);
    }
  } else {
    sql.field('Project.proj_id', 'projectId');
  }
  sql.distinct();
  if (userName) {
    sql.join('scada.user_allow_device', 'UserAllowDevice', squel.expr().and('Project.proj_id = UserAllowDevice.proj_id'));
    sql.join('scada.user_info', 'UserInfo', squel.expr().and('UserAllowDevice.user_id = UserInfo.user_id'));
    sql.where('Userinfo.user_name = ?', userName);
  }
  if (projectId) {
    sql.where('Project.proj_id = ?', projectId);
  }
  for (let key in filter) {
    sql.where('Project.' + key + ' LIKE ?', filter[key]);
  }
  sql.order(sortby, order);
  return new Promise((resolve, reject) => {
    _sequelize.query(sql.toString(), { type: _sequelize.QueryTypes.SELECT, model: projectVo }).then((raws) => {
      resolve(raws);
    }).catch((err) => {
      reject(err);
    });
  });
}

function _getProject (projectId) {
  return projectVo.findOne({ where: { projectId } });
}

function _insertProject (project, trans) {
  return projectVo.create(project, { transaction: trans });
}

function _updateProject (filter = {}, project, trans) {
  return projectVo.update(project, { where: filter, transaction: trans });
}

function _deleteProject (filter, trans) {
  return projectVo.destroy({where: filter, transaction: trans});
}

function _getProjectsRightByUserName (userName, filterObj = {}) {
  let sql = squel.select().from('scada.project_list', 'Project');
  sql.field('Project.proj_id', 'projectId');
  sql.field('SUB.userId', 'userId');
  sql.distinct();
  sql.left_join(squel.select().from('scada.user_allow_device', 'UserAllowDevice')
  .field('UserAllowDevice.user_id', 'userId').field('UserAllowDevice.proj_id', 'projectId')
  .join('scada.user_info', 'UserInfo', squel.expr().and('UserAllowDevice.user_id = UserInfo.user_id').and('Userinfo.user_name = ?', userName)), 'SUB', 'SUB.projectId = Project.proj_id');
  if (filterObj.projectId) {
    sql.where(('UserAllowDevice.proj_id = ?', filterObj.projectId));
  }
  if (filterObj.scadaId) {
    sql.where(('UserAllowDevice.scada_id = ?', filterObj.scadaId));
  }
  if (filterObj.deviceId) {
    sql.where(('UserAllowDevice.device_id = ?', filterObj.deviceId));
  }

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
  getProjectsRightByUserName: _getProjectsRightByUserName,
  insertProject: _insertProject,
  updateProject: _updateProject,
  deleteProject: _deleteProject
};
