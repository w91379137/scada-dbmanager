'use strict';

const BaseDao = require('./baseDao.js');

class ScadaDao extends BaseDao {
  constructor (sequelize) {
    super(sequelize);

    this.scadaVo = sequelize.import('../models/scadaVo');
  }

  getScadaList () {
    return this.scadaVo.findAll();
  }

  getScada (scadaId) {
    return this.scadaVo.findOne({ where: { scadaId } });
  }

  insertScada (scada, trans) {
    return this.scadaVo.create(scada, { transaction: trans });
  }

  updateScada (scada, scadaId, trans) {
    return this.scadaVo.update(scada, { where: { scadaId } }, { transaction: trans }
    );
  }

  deleteScada (scadaId, trans) {
    return this.scadaVo.destroy({ where: { scadaId } }, { transaction: trans });
  }
}

module.exports = ScadaDao;
