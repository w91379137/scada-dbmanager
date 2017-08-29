'use strict';

var userVo = null;

function _init (sequelize) {
  userVo = sequelize.import('../models/userVo');
}

function _getUserList () {
  return userVo.findAll();
}

function _getUser (userId) {
  return userVo.findOne({ where: {userId} });
}

function _insertUser (userObj, trans) {
  return userVo.create(userObj, { transaction: trans });
}

function _updateUser (userObj, userId, trans) {
  return userVo.update(userObj, { where: { userId } }, { transaction: trans });
}

function _deleteUser (userId, trans) {
  return userVo.destroy({ where: { userId } }, { transaction: trans });
}

module.exports = {
  init: _init,
  getUserList: _getUserList,
  getUser: _getUser,
  insertUser: _insertUser,
  updateUser: _updateUser,
  deleteUser: _deleteUser
};
