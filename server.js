// Read the .env file.
// require('dotenv').config()
// external modules
// Require the framework
const Fastify = require('fastify');
const { isEmpty, get } = require('lodash');
const path = require('path');
const AutoLoad = require('fastify-autoload');
const uuidv4 = require('uuid/v4');
const globalLog = require('global-request-logger');
const jwt = require('fastify-jwt');
const nconf = require('nconf');
const cors = require('fastify-cors');

// local modules
const { loadSettings } = require('./config/configurationAdaptor');
const { port } = require('./config/config');
// const { createLogger, serializers } = require('./appbase/logger');

let globalLogInitializedFlag = false;
const cwd = process.cwd();
const logPath = path.join(cwd, 'logs');


// create request ids
const createRequestId = () => uuidv4();

const toggleGlobalRequestLogging = () => {
  if (!globalLogInitializedFlag) {
    globalLog.initialize();
    globalLogInitializedFlag = true;
  } else {
    globalLog.end();
    globalLogInitializedFlag = false;
  }
};

const registerEventHandlers = (log) => {
  globalLog.on('success', (request, response) => {
    let responseTime = 0;
    const startTime = get(request, 'headers.starttime');
    if (startTime) {
      const endTime = (new Date().toISOString()).split('Z')[0];
      responseTime = new Date(endTime) - new Date(startTime);
    }
    log.info({
      reqId: get(request, 'headers.request-id', ''), responseTime, externalReq: request, externalRes: response,
    }, 'External API Call Success');
  });

  globalLog.on('error', (request, response) => {
    let responseTime = 0;
    const startTime = get(request, 'headers.starttime');
    if (startTime) {
      const endTime = (new Date().toISOString()).split('Z')[0];
      responseTime = new Date(endTime) - new Date(startTime);
    }
    log.error({
      reqId: get(request, 'headers.request-id', ''), responseTime, externalReq: request, externalRes: response,
    }, 'External API Call Error');
  });
};

const loadPlugins = (fastify, opts, next) => {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'api', 'plugins'),
    options: Object.assign({}, opts),
  });

  // This loads all plugins defined in services
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'api', 'routes'),
    options: Object.assign({}, opts),
  });

  fastify.register(jwt, {
    secret: nconf.get('secrets.jwt'),
  });

  fastify.register(cors, { origin: false });

  // Make sure to call next when done
  next();
};

const loadConfigSettings = ({ appSettingsPath }) => new Promise((resolve) => {
  if (isEmpty(appSettingsPath)) {
    const err = new Error('Config settings can not be loaded as configuration properties file path is not specified.');
    console.log(err);
    throw err;
  }
  loadSettings({ appSettingsPath }).then(() => {
    resolve();
  }).catch((err) => {
    throw err;
  });
});

const createServer = (options, cb) => {
  try {
    // Instantiate fastify with some config
    const server = Fastify({
      ignoreTrailingSlash: true,
      genReqId: createRequestId,
      logger: {
        file: path.join(logPath, 'logs.log'),
        level: 'info',
      },
    });
    // Register your application as a normal plugin.
    server.register(loadPlugins);
    toggleGlobalRequestLogging();
    registerEventHandlers(server.log);

    cb().then(() => {
      server.listen(port, (err) => {
        if (err) {
          server.log.error(err);
          console.log(err);
          process.exit(1);
        }
        server.log.info('Server Started');
      });
    }).catch((err) => {
      // log error
      throw err;
    });
  } catch (err) {
    // log error
    throw err;
  }
};

module.exports = {
  loadConfigSettings,
  createServer,
};
