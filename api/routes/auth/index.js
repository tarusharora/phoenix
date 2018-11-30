const { validatePostLogin, validatePostSignup } = require('../../validations/user');
const { postLogin, postSignup } = require('../../controllers/auth');

module.exports = async (fastify, opts) => {
  fastify.post('/auth/login', validatePostLogin, postLogin);
  fastify.post('/auth/signup', validatePostSignup, postSignup);
};
