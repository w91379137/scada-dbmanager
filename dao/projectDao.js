'use strict';

const Sequelize = require('sequelize');
const Utils = require('../common/utils');

var projectVo = null;
var scadaVo = null;

function _init (sequelize) {
  projectVo = sequelize.import('../models/projectVo');
  scadaVo = sequelize.import('../models/scadaVo');
}

/**
 * @param {Object} filterObj
 * @param {Integer} filterObj.offset: starting index
 * @param {Integer} filterObj.limit: data retrived
 * @param {String} filterObj.projectName: filter project name
 * @param {String} filterObj.projectDesc: filter project desc
 * @param {String} filterObj.sortby: sort properties
 * @param {String} filterObj.order: order asc or desc
 *  }
 */

function _getProjectList (filterObj) {
  let props = Object.keys(projectVo.attributes);
  let where = {};
  for (let idx in props) {
    let key = props[idx];
    if (!Utils.isNullOrUndefined(filterObj[key])) {
      where[key] = { $like: filterObj[key] };
    }
  }
  let filter = {};
  filter.offset = !Utils.isNullOrUndefined(filterObj.offset) ? filterObj.offset : null;
  filter.limit = !Utils.isNullOrUndefined(filterObj.limit) ? filterObj.limit : null;
  filter.order = !Utils.isNullOrUndefined(filterObj.sortby) && !Utils.isNullOrUndefined(filterObj.order) ? Sequelize.literal(filterObj.sortby + ' ' + filterObj.order) : null;
  filter.where = where;
  return projectVo.findAndCountAll(filter);
}

function _getProject (projectId) {
  return projectVo.findOne({ where: { projectId } });
}

function _insertProject (project, trans) {
  return projectVo.create(project, { transaction: trans });
}

function _updateProjectById (projectId, project, trans) {
  return projectVo.update(project, { where: { projectId } }, { transaction: trans }).then(function (c) {
    if (project.projectId && project.projectId !== projectId) {
      return scadaVo.update({ projectId: project.projectId }, { where: { projectId: project.projectId }, transaction: trans });
    }
  });
}

function _deleteProjectById (projectId, trans) {
  return projectVo.destroy({ where: { projectId } }, { transaction: trans }).then(function (rows) {
    return scadaVo.update({projectId: null}, { where: { projectId }, transaction: trans });
  });
}

module.exports = {
  init: _init,
  getProjectList: _getProjectList,
  getProject: _getProject,
  insertProject: _insertProject,
  updateProjectById: _updateProjectById,
  deleteProjectById: _deleteProjectById
};
