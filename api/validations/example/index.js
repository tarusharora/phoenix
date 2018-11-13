const example = {
  schema: {
    headers: {
      type: 'object',
      properties: {
        'x-foo': { type: 'string' },
      },
      required: ['x-foo'],
    },
  },
};

const userList = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        page: { type: 'integer' },
      },
      required: ['page'],
    },
  },
};


module.exports = {
  example,
  userList,
};
