const request = require('request-promise');

let timeOut = 60000;

// public function
const configureHttpClient = (httpClientConfigurations) => {
  timeOut = (httpClientConfigurations.timeout && httpClientConfigurations.timeout >= 0) ? httpClientConfigurations.timeout : timeOut;
  return timeOut;
};
// --private functions--

const addCustomHeaders = (options, customHeaders) => {
  if (customHeaders) {
    customHeaders.forEach((item) => {
      options.headers[item.name] = item.value;
    });
  }
};

// const addAdvancedOptions = (requestOptions, advanceOptions) => {
//   if (!advanceOptions) {
//     return;
//   }

//   if (advanceOptions.resolveWithFullResponseFlag !== undefined) {
//     requestOptions.resolveWithFullResponse = advanceOptions.resolveWithFullResponseFlag;
//   }

//   if (advanceOptions.resolveWithSuccessfulOnlyFlag !== undefined) {
//     requestOptions.simple = advanceOptions.resolveWithSuccessfulOnlyFlag;
//   }
// };

const createOptions = (url, verb, customHeaders, reqBody, advanceOptions) => {
  const options = {
    uri: url,
    method: verb,
    headers: { startTime: new Date().toISOString().split('Z')[0] },
    body: reqBody,
    json: true,
    time: true,
  };
  addCustomHeaders(options, customHeaders);
  // addAdvancedOptions(options, advanceOptions);
  return options;
};


// public functions
const getRequest = ({ url, customHeaders, options }) => {
  const requestOptions = createOptions(url, 'GET', customHeaders, options);
  return request(requestOptions);
};

const postRequest = ({ url, reqBody, customHeaders }) => {
  const options = createOptions(url, 'POST', customHeaders, reqBody);
  if (!options.headers['content-type']) {
    options.headers['content-type'] = 'application/json';
  }
  return request(options);
};

const putRequest = ({
  url, reqBody, customHeaders, options,
}) => {
  const requestOptions = createOptions(url, 'PUT', customHeaders, reqBody, options);
  if (!requestOptions.headers['content-type']) {
    requestOptions.headers['content-type'] = 'application/json';
  }

  return request(requestOptions);
};

const deleteRequest = ({ url, customHeaders }) => {
  const options = createOptions(url, 'DELETE', customHeaders);
  return request(options);
};

const patchRequest = ({ url, reqBody, customHeaders }) => {
  const requestOptions = createOptions(
    url,
    'PATCH',
    customHeaders,
    reqBody,
  );
  if (!requestOptions.headers['content-type']) {
    requestOptions.headers['content-type'] = 'application/json';
  }
  return request(requestOptions);
};

module.exports = {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  patchRequest,
  configureHttpClient,
};
