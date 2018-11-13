const { getUsers } = require('../../adaptors/exampleAdaptor');

const exampleCtrl = async (request, reply) => 'Boom: Example';

const getUsersCtrl = async (request, reply) => {
  try {
    const customHeaders = request.customHeaders();
    const data = await getUsers({ customHeaders });
    if (data) {
      reply.send(data);
    }
  } catch (err) {
    throw err;
  }
};

module.exports = {
  exampleCtrl,
  getUsersCtrl,
};
