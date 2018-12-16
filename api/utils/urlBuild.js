const joinUrl = require('url-join');
const nconf = require('nconf');

const selfUrl = nconf.get('url.self');
// const frontEnd = nconf.get('url.frontEnd');
const generateEmailVerifyURL = token => joinUrl(selfUrl, token);

module.exports = {
  generateEmailVerifyURL,
};
