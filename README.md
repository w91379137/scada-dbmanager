# scada-dbmanager

scada-dbmanager is a utility of EI-PaaS SCADA for database management.

## Installation

`npm install scada-dbmanager`

## Initial

```js
const DBManager = require('scada-dbmanager');
let conf = {
  hostname: '127.0.0.1',
  port: 5432,
  username: 'admin',
  password: '1234',
  database: 'postgres'
};
let dbmanager = new DBManager(config);
let scadaDao = dbmanager.scadaDao;
let deviceDao = dbmanager.deviceDao;
let tagDao = dbmanager.tagDao;

```

## API

<a name="scadaDao"></a>
## scadaDao

* <a href="#scadaDao"><code>scadaDao</b></code></a>
-------------------------------------------------------

<a name="deviceDao"></a>
## deviceDao

* <a href="#deviceDao"><code>deviceDao</b></code></a>
-------------------------------------------------------

<a name="tagDao"></a>
## tagDao

* <a href="#tagDao"><code>tagDao</b></code></a>
-------------------------------------------------------