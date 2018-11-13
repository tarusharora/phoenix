const appName = 'my first api';
const { APP_SETTINGS_FILE_PATH, port = 3000 } = process.env;

module.exports = {
  appName,
  port,
  appSettingsFilePath: APP_SETTINGS_FILE_PATH,
};
