const nconf = require('nconf');
const db = require('./api/db');

const { appSettingsFilePath } = require('./config/config');
const server = require('./server');
const { configureHttpClient } = require('./appbase/httpClient');

const startupProcess = () => new Promise((resolve) => {
  configureHttpClient({ timeout: nconf.get('externalRequestTimeoutMilliseconds') });
  resolve();
});


server.loadConfigSettings({ appSettingsPath: appSettingsFilePath })
  .then(() => {
    const serverOptions = {
      passOnRequestHeaders: nconf.get('passOnRequestHeaders'),
    };
    const mongoURI = nconf.get('db.mongodb.uri');
    db.connectMongo(mongoURI);
    server.createServer(serverOptions, startupProcess);
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });
