const { validateEmailToken } = require('../../validations/user');
const { verifyEmailToken } = require('../../controllers/user');

module.exports = async (fastify) => {
  fastify.post('/users/email/verify/', validateEmailToken, verifyEmailToken);
};
