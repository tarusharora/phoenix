const appName = 'my first api';
const { APP_SETTINGS_FILE_PATH, port = 3030 } = process.env;

module.exports = {
  appName,
  port,
  appSettingsFilePath: APP_SETTINGS_FILE_PATH,
};
