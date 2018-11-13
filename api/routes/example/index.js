const { example: exampleOptions, userList } = require('../../validations/example');
const { exampleCtrl, getUsersCtrl } = require('../../controllers/example');

module.exports = async (fastify, opts) => {
  fastify.get('/example', exampleOptions, exampleCtrl);
  fastify.get('/users', userList, getUsersCtrl);
};
