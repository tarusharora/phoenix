

const fp = require('fastify-plugin');
const nconf = require('nconf');

const { get } = require('lodash');

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

/* eslint-disable */

module.exports = fp((fastify, opts, next) => {

  fastify.decorateRequest('customHeaders', function () { 
    const headers = [];
    const customHeaders = [];
    const passOnRequestHeaders = nconf.get('passOnRequestHeaders');    
    const headerList = passOnRequestHeaders.split(',');
    headerList.forEach(header => headers.push(header.toLowerCase()));
    headers.forEach((header) => {
        const headerValue = get(this.headers, header);
        if (headerValue) {
          customHeaders.push({
            name: header,
            value: headerValue,
          });
        }
      });
      return customHeaders;
    })
next();
});

/* eslint-enable */

// It you prefer async/await, use the following
//
// module.exports = fp(async function (fastify, opts) {
//   fastify.decorate('someSupport', function () {
//     return 'hugs'
//   })
// })
