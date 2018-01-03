'use strict';

var _sequelize = null;

function _init (sequelize) {
  _sequelize = sequelize;
}

module.exports = {
  init: _init
};
