var config;

switch ( process.env.NODE_ENV ) {
  case 'production':
    config = require('./prod_config.js');
    break;
  default:
    config = require('./dev_config.js');
    break;
}

module.exports = config;
