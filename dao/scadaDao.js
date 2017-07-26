'use strict';

const BaseDao = require('./baseDao.js');

class ScadaDao extends BaseDao {
  constructor (sequelize) {
    super(sequelize);

    this.scadaVo = sequelize.import('../models/scadaVo');
  }

  getScadaData () {
    return this.scadaVo.findAll();
  }

  getScadaDataById (id) {
    return this.scadaVo.findOne({ where: { scadaId: id } });
  }

  insertScadaData (scada, trans) {
    return this.scadaVo.create(scada, { transaction: trans });
  }

  updateScadaData (scada, id, trans) {
    return this.scadaVo.update(scada, { where: { scadaId: id } }, { transaction: trans }
    );
  }

  deleteScadaData (id, trans) {
    return this.scadaVo.destroy({ where: { scadaId: id } }, { transaction: trans });
  }
}

module.exports = ScadaDao;
