'use strict';

const Promise = require('bluebird');

const constant = require('../common/const.js');

var tagVo = null;
var analogTagVo = null;
var discreteTagVo = null;
var textTagVo = null;
var alarmAnalogVo = null;
var alarmDiscreteVo = null;

var wholeAnalogTagVo = null;
var wholeDiscreteTagVo = null;
var wholeTextTagVo = null;

var _sequelize = null;

function _init (sequelize) {
  tagVo = sequelize.import('../models/tagVo');
  analogTagVo = sequelize.import('../models/analogTagVo');
  discreteTagVo = sequelize.import('../models/discreteTagVo');
  textTagVo = sequelize.import('../models/textTagVo');
  alarmAnalogVo = sequelize.import('../models/alarmAnalogVo');
  alarmDiscreteVo = sequelize.import('../models/alarmDiscreteVo');

  wholeAnalogTagVo = sequelize.import('../models/wholeAnalogTagVo');
  wholeDiscreteTagVo = sequelize.import('../models/wholeDiscreteTagVo');
  wholeTextTagVo = sequelize.import('../models/wholeTextTagVo');

  _sequelize = sequelize;

  // tagVo.belongsTo(analogTagVo, { foreignKey: 'scadaId' });
  // analogTagVo.belongsTo(tagVo, { foreignKey: 'scadaId' });
}

function __getAnalogTagListByScadaId (scadaId) {
  let sql =
    'SELECT tag_list.scada_id AS scadaId, tag_list.device_id AS deviceId, tag_list.tag_name AS tagName, tag_list.tag_description AS description, ' +
    'tag_list.alarm_status AS alarmStatus, tag_list.tag_type AS tagType, tag_list.array_size AS arraySize, tag_list.data_log AS dataLog, ' +
    'tag_list.read_only AS readOnly, tag_analog.eng_unit AS engUnit, tag_analog.span_high AS spanHigh, tag_analog.span_low AS spanLow, ' +
    'tag_analog.int_dsp_fmt AS intDspFmt, tag_analog.fra_dsp_fmt AS fraDspFmt FROM scada.tag_list AS tag_list INNER JOIN scada.tag_analog AS tag_analog ON ' +
    'tag_list.scada_id = tag_analog.scada_id AND tag_list.device_id = tag_analog.device_id AND tag_list.tag_name = tag_analog.tag_name ' +
    'WHERE tag_list.scada_id = $scadaId';

  return _sequelize.query(sql, { bind: { scadaId: scadaId }, type: _sequelize.QueryTypes.SELECT, model: wholeAnalogTagVo });

  /* return tagVo.findAll({
    include: [{
      model: analogTagVo,
      as: 'tag_analog',
      required: true,
      on: {
        col1: _sequelize.where(_sequelize.col('tag_list.scada_id'), '=', _sequelize.col('tag_analog.scada_id')),
        col2: _sequelize.where(_sequelize.col('tag_list.device_id'), '=', _sequelize.col('tag_analog.device_id')),
        col3: _sequelize.where(_sequelize.col('tag_list.tag_name'), '=', _sequelize.col('tag_analog.tag_name'))
      }
    }
    ],
    where: { scadaId }
  }); */
}

function __getDiscreteTagListByScadaId (scadaId) {
  let sql =
      'SELECT tag_list.scada_id AS scadaId, tag_list.device_id AS deviceId, tag_list.tag_name AS tagName, tag_list.tag_description AS description, ' +
      'tag_list.alarm_status AS alarmStatus, tag_list.tag_type AS tagType, tag_list.array_size AS arraySize, tag_list.data_log AS dataLog, ' +
      'tag_list.read_only AS readOnly, tag_discrete.state_0 AS state0, tag_discrete.state_1 AS state1, tag_discrete.state_2 AS state2, ' +
      'tag_discrete.state_3 AS state3, tag_discrete.state_4 AS state4, tag_discrete.state_5 AS state5, tag_discrete.state_6 AS state6, ' +
      'tag_discrete.state_7 AS state7 FROM scada.tag_list AS tag_list INNER JOIN scada.tag_discrete AS tag_discrete ON ' +
      'tag_list.scada_id = tag_discrete.scada_id AND tag_list.device_id = tag_discrete.device_id AND tag_list.tag_name = tag_discrete.tag_name ' +
      'WHERE tag_list.scada_id = $scadaId';

  return _sequelize.query(sql, { bind: { scadaId: scadaId }, type: _sequelize.QueryTypes.SELECT, model: wholeDiscreteTagVo });
}

function __getTextTagListByScadaId (scadaId) {
  let sql =
    'SELECT tag_list.scada_id AS scadaId, tag_list.device_id AS deviceId, tag_list.tag_name AS tagName, tag_list.tag_description AS description, ' +
    'tag_list.alarm_status AS alarmStatus, tag_list.tag_type AS tagType, tag_list.array_size AS arraySize, tag_list.data_log AS dataLog, ' +
    'tag_list.read_only AS readOnly FROM scada.tag_list AS tag_list INNER JOIN scada.tag_text AS tag_text ON ' +
    'tag_list.scada_id = tag_text.scada_id AND tag_list.device_id = tag_text.device_id AND tag_list.tag_name = tag_text.tag_name ' +
    'WHERE tag_list.scada_id = $scadaId';

  return _sequelize.query(sql, { bind: { scadaId: scadaId }, type: _sequelize.QueryTypes.SELECT, model: wholeTextTagVo });
}

function _getTag (scadaId, deviceId, tagName) {
  return tagVo.findOne({
    where: { scadaId, deviceId, tagName }
  });
}

function _getTagListByScadaId (scadaId) {
  return tagVo.findAll({
    where: { scadaId }
  });
}

function _getWholeTagListByScadaId (scadaId) {
  return new Promise((resolve, reject) => {
    let output = {};
    let promise = [];
    promise.push(__getAnalogTagListByScadaId(scadaId));
    promise.push(__getDiscreteTagListByScadaId(scadaId));
    promise.push(__getTextTagListByScadaId(scadaId));
    Promise.all(promise)
      .then((results) => {
        output.analogTagList = results[0];
        output.discreteTagList = results[1];
        output.textTagList = results[2];
        resolve(output);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function _getTagListBydeviceId (scadaId, deviceId) {
  return tagVo.findAll({
    where: { scadaId, deviceId }
  });
}

function _getAnalogTag (scadaId, deviceId, tagName) {
  return analogTagVo.findOne({
    where: { scadaId, deviceId, tagName }
  });
}

function _getDiscreteTag (scadaId, deviceId, tagName) {
  return discreteTagVo.findOne({
    where: { scadaId, deviceId, tagName }
  });
}

function _getTextTag (scadaId, deviceId, tagName) {
  return textTagVo.findOne({
    where: { scadaId, deviceId, tagName }
  });
}

function _getAlarmAnalogTag (scadaId, deviceId, tagName) {
  return alarmAnalogVo.findOne({
    where: { scadaId, deviceId, tagName }
  });
}

function _getAlarmDiscreteTag (scadaId, deviceId, tagName) {
  return alarmDiscreteVo.findOne({
    where: { scadaId, deviceId, tagName }
  });
}

function _insertTag (tag, trans) {
  return tagVo.create(tag, { transaction: trans });
}

function _insertAnalogTag (tag, trans) {
  return analogTagVo.create(tag, { transaction: trans });
}

function _insertDiscreteTag (tag, trans) {
  return discreteTagVo.create(tag, { transaction: trans });
}

function _insertTextTag (tag, trans) {
  return textTagVo.create(tag, { transaction: trans });
}

function _insertAlarmAnalogTag (tag, trans) {
  return alarmAnalogVo.create(tag, { transaction: trans });
}

function _insertAlarmDiscreteTag (tag, trans) {
  return alarmDiscreteVo.create(tag, { transaction: trans });
}

function _updateTag (tag, scadaId, deviceId, tagName, trans) {
  return tagVo.update(
      tag, { where: { scadaId, deviceId, tagName } }, { transaction: trans }
    );
}

function _updateAnalogTag (tag, scadaId, deviceId, tagName, trans) {
  return analogTagVo.update(
      tag, { where: { scadaId, deviceId, tagName } }, { transaction: trans }
    );
}

function _updateDiscreteTag (tag, scadaId, deviceId, tagName, trans) {
  return discreteTagVo.update(
      tag, { where: { scadaId, deviceId, tagName } }, { transaction: trans }
    );
}

function _updateTextTag (tag, scadaId, deviceId, tagName, trans) {
  return textTagVo.update(
      tag, { where: { scadaId, deviceId, tagName } }, { transaction: trans }
    );
}

function _updateAlarmAnalogTag (tag, scadaId, deviceId, tagName, trans) {
  return alarmAnalogVo.update(
      tag, { where: { scadaId, deviceId, tagName } }, { transaction: trans }
    );
}

function _updateAlarmDiscreteTag (tag, scadaId, deviceId, tagName, trans) {
  return alarmDiscreteVo.update(
      tag, { where: { scadaId, deviceId, tagName } }, { transaction: trans }
    );
}

function _deleteTagListByScadaId (scadaId, trans) {
  let promises = [];
  promises.push(tagVo.destroy({ where: { scadaId } }, { transaction: trans }));
  promises.push(analogTagVo.destroy({ where: { scadaId } }, { transaction: trans }));
  promises.push(alarmAnalogVo.destroy({ where: { scadaId } }, { transaction: trans }));
  promises.push(discreteTagVo.destroy({ where: { scadaId } }, { transaction: trans }));
  promises.push(alarmDiscreteVo.destroy({ where: { scadaId } }, { transaction: trans }));
  promises.push(textTagVo.destroy({ where: { scadaId } }, { transaction: trans }));
  return Promise.all(promises);
}

function _deleteTagListByDeviceId (scadaId, deviceId, trans) {
  let promises = [];
  promises.push(tagVo.destroy({ where: { scadaId, deviceId } }, { transaction: trans }));
  promises.push(analogTagVo.destroy({ where: { scadaId, deviceId } }, { transaction: trans }));
  promises.push(alarmAnalogVo.destroy({ where: { scadaId, deviceId } }, { transaction: trans }));
  promises.push(discreteTagVo.destroy({ where: { scadaId, deviceId } }, { transaction: trans }));
  promises.push(alarmDiscreteVo.destroy({ where: { scadaId, deviceId } }, { transaction: trans }));
  promises.push(textTagVo.destroy({ where: { scadaId, deviceId } }, { transaction: trans }));
  return Promise.all(promises);
}

function _deleteTag (scadaId, deviceId, tagName, trans) {
  let promises = [];
  promises.push(tagVo.destroy({ where: { scadaId, deviceId, tagName } }, { transaction: trans }));
  promises.push(analogTagVo.destroy({ where: { scadaId, deviceId, tagName } }, { transaction: trans }));
  promises.push(alarmAnalogVo.destroy({ where: { scadaId, deviceId, tagName } }, { transaction: trans }));
  promises.push(discreteTagVo.destroy({ where: { scadaId, deviceId, tagName } }, { transaction: trans }));
  promises.push(alarmDiscreteVo.destroy({ where: { scadaId, deviceId, tagName } }, { transaction: trans }));
  promises.push(textTagVo.destroy({ where: { scadaId, deviceId, tagName } }, { transaction: trans }));
  return Promise.all(promises);
}

function _deleteAlarmTag (scadaId, deviceId, tagName, type, trans) {
  let promises = [];
  promises.push(_getTag(scadaId, deviceId, tagName));
  switch (type) {
    case constant.tagType.analog:
      promises.push(alarmAnalogVo.destroy({
        where: { scadaId, deviceId, tagName }
      }, { transaction: trans }));
      break;
    case constant.tagType.discrete:
      promises.push(alarmDiscreteVo.destroy({
        where: { scadaId, deviceId, tagName }
      }, { transaction: trans }));
      break;
  }

  return Promise.all(promises);
}

module.exports = {
  init: _init,
  getTag: _getTag,
  getTagListByScadaId: _getTagListByScadaId,
  getWholeTagListByScadaId: _getWholeTagListByScadaId,
  getTagListBydeviceId: _getTagListBydeviceId,
  getAnalogTag: _getAnalogTag,
  getDiscreteTag: _getDiscreteTag,
  getTextTag: _getTextTag,
  getAlarmAnalogTag: _getAlarmAnalogTag,
  getAlarmDiscreteTag: _getAlarmDiscreteTag,
  insertTag: _insertTag,
  insertAnalogTag: _insertAnalogTag,
  insertDiscreteTag: _insertDiscreteTag,
  insertTextTag: _insertTextTag,
  insertAlarmAnalogTag: _insertAlarmAnalogTag,
  insertAlarmDiscreteTag: _insertAlarmDiscreteTag,
  updateTag: _updateTag,
  updateAnalogTag: _updateAnalogTag,
  updateDiscreteTag: _updateDiscreteTag,
  updateTextTag: _updateTextTag,
  updateAlarmAnalogTag: _updateAlarmAnalogTag,
  updateAlarmDiscreteTag: _updateAlarmDiscreteTag,
  deleteTagListByScadaId: _deleteTagListByScadaId,
  deleteTagListByDeviceId: _deleteTagListByDeviceId,
  deleteTag: _deleteTag,
  deleteAlarmTag: _deleteAlarmTag
};

/* const BaseDao = require('./baseDao.js');
const constant = require('../common/const.js');

class TagDao extends BaseDao {
  constructor (sequelize) {
    super(sequelize);

    this.tagVo = sequelize.import('../models/tagVo');
    this.analogTagVo = sequelize.import('../models/analogTagVo');
    this.discreteTagVo = sequelize.import('../models/discreteTagVo');
    this.textTagVo = sequelize.import('../models/textTagVo');
    this.alarmAnalogVo = sequelize.import('../models/alarmAnalogVo');
    this.alarmDiscreteVo = sequelize.import('../models/alarmDiscreteVo');
  }

  getTag (scadaId, deviceId, tagName) {
    return this.tagVo.findOne({
      where: { scadaId, deviceId, tagName }
    });
  }

  getTagListByScadaId (scadaId) {
    return this.tagVo.findAll({
      where: { scadaId }
    });
  }

  getTagListBydeviceId (scadaId, deviceId) {
    return this.tagVo.findAll({
      where: { scadaId, deviceId }
    });
  }

  getAnalogTag (scadaId, deviceId, tagName) {
    return this.analogTagVo.findOne({
      where: { scadaId, deviceId, tagName }
    });
  }

  getDiscreteTag (scadaId, deviceId, tagName) {
    return this.discreteTagVo.findOne({
      where: { scadaId, deviceId, tagName }
    });
  }

  getTextTag (scadaId, deviceId, tagName) {
    return this.textTagVo.findOne({
      where: { scadaId, deviceId, tagName }
    });
  }

  getAlarmAnalogTag (scadaId, deviceId, tagName) {
    return this.alarmAnalogVo.findOne({
      where: { scadaId, deviceId, tagName }
    });
  }

  getAlarmDiscreteTag (scadaId, deviceId, tagName) {
    return this.alarmDiscreteVo.findOne({
      where: { scadaId, deviceId, tagName }
    });
  }

  insertTag (tag, trans) {
    return this.tagVo.create(tag, { transaction: trans });
  }

  insertAnalogTag (tag, trans) {
    return this.analogTagVo.create(tag, { transaction: trans });
  }

  insertDiscreteTag (tag, trans) {
    return this.discreteTagVo.create(tag, { transaction: trans });
  }

  insertTextTag (tag, trans) {
    return this.textTagVo.create(tag, { transaction: trans });
  }

  insertAlarmAnalogTag (tag, trans) {
    return this.alarmAnalogVo.create(tag, { transaction: trans });
  }

  insertAlarmDiscreteTag (tag, trans) {
    return this.alarmDiscreteVo.create(tag, { transaction: trans });
  }

  updateTag (tag, scadaId, deviceId, tagName, trans) {
    return this.tagVo.update(
      tag, { where: { scadaId, deviceId, tagName } }, { transaction: trans }
    );
  }

  updateAnalogTag (tag, scadaId, deviceId, tagName, trans) {
    return this.analogTagVo.update(
      tag, { where: { scadaId, deviceId, tagName } }, { transaction: trans }
    );
  }

  updateDiscreteTag (tag, scadaId, deviceId, tagName, trans) {
    return this.discreteTagVo.update(
      tag, { where: { scadaId, deviceId, tagName } }, { transaction: trans }
    );
  }

  updateTextTag (tag, scadaId, deviceId, tagName, trans) {
    return this.textTagVo.update(
      tag, { where: { scadaId, deviceId, tagName } }, { transaction: trans }
    );
  }

  updateAlarmAnalogTag (tag, scadaId, deviceId, tagName, trans) {
    return this.alarmAnalogVo.update(
      tag, { where: { scadaId, deviceId, tagName } }, { transaction: trans }
    );
  }

  updateAlarmDiscreteTag (tag, scadaId, deviceId, tagName, trans) {
    return this.alarmDiscreteVo.update(
      tag, { where: { scadaId, deviceId, tagName } }, { transaction: trans }
    );
  }

  deleteTagListByScadaId (scadaId, trans) {
    let promises = [];
    promises.push(this.tagVo.destroy({ where: { scadaId } }, { transaction: trans }));
    promises.push(this.analogTagVo.destroy({ where: { scadaId } }, { transaction: trans }));
    promises.push(this.alarmAnalogVo.destroy({ where: { scadaId } }, { transaction: trans }));
    promises.push(this.discreteTagVo.destroy({ where: { scadaId } }, { transaction: trans }));
    promises.push(this.alarmDiscreteVo.destroy({ where: { scadaId } }, { transaction: trans }));
    promises.push(this.textTagVo.destroy({ where: { scadaId } }, { transaction: trans }));
    return Promise.all(promises);
  }

  deleteTagListByDeviceId (scadaId, deviceId, trans) {
    let promises = [];
    promises.push(this.tagVo.destroy({ where: { scadaId, deviceId } }, { transaction: trans }));
    promises.push(this.analogTagVo.destroy({ where: { scadaId, deviceId } }, { transaction: trans }));
    promises.push(this.alarmAnalogVo.destroy({ where: { scadaId, deviceId } }, { transaction: trans }));
    promises.push(this.discreteTagVo.destroy({ where: { scadaId, deviceId } }, { transaction: trans }));
    promises.push(this.alarmDiscreteVo.destroy({ where: { scadaId, deviceId } }, { transaction: trans }));
    promises.push(this.textTagVo.destroy({ where: { scadaId, deviceId } }, { transaction: trans }));
    return Promise.all(promises);
  }

  deleteTag (scadaId, deviceId, tagName, trans) {
    let promises = [];
    promises.push(this.tagVo.destroy({ where: { scadaId, deviceId, tagName } }, { transaction: trans }));
    promises.push(this.analogTagVo.destroy({ where: { scadaId, deviceId, tagName } }, { transaction: trans }));
    promises.push(this.alarmAnalogVo.destroy({ where: { scadaId, deviceId, tagName } }, { transaction: trans }));
    promises.push(this.discreteTagVo.destroy({ where: { scadaId, deviceId, tagName } }, { transaction: trans }));
    promises.push(this.alarmDiscreteVo.destroy({ where: { scadaId, deviceId, tagName } }, { transaction: trans }));
    promises.push(this.textTagVo.destroy({ where: { scadaId, deviceId, tagName } }, { transaction: trans }));
    return Promise.all(promises);
  }

  deleteAlarmTag (scadaId, deviceId, tagName, type, trans) {
    let promises = [];
    promises.push(this.tagDao.getTag(scadaId, deviceId, tagName));
    switch (type) {
      case constant.tagType.analog:
        promises.push(this.alarmAnalogVo.destroy({
          where: { scadaId, deviceId, tagName }
        }, { transaction: trans }));
        break;
      case constant.tagType.discrete:
        promises.push(this.alarmDiscreteVo.destroy({
          where: { scadaId, deviceId, tagName }
        }, { transaction: trans }));
        break;
    }

    return Promise.all(promises);
  }
}

module.exports = TagDao; */
