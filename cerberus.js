var config;
try {
  config = require('./config.json');
}
catch(e) {
  config = {};
}

require('./app/main.js').run(config);
