require('dotenv').config();
const dataSource = require('./data-source').default;

module.exports = dataSource.options;
