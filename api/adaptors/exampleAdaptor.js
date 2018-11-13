// npm import
const joinUrl = require('url-join');
const nconf = require('nconf');

const { getRequest } = require('../../appbase/httpClient');

const exampleServiceUrl = nconf.get('url.exampleService');

const getUsers = ({ customHeaders }) => getRequest({ url: joinUrl(exampleServiceUrl, 'users'), customHeaders });

module.exports = {
  getUsers,
};
