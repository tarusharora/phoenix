const nconf = require('nconf');

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
    server.createServer(serverOptions, startupProcess);
  })
  .catch(() => {

  });
