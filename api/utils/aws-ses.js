// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');

const nodemailer = require('nodemailer');
const nconf = require('nconf');

// Set the region
AWS.config = new AWS.Config();
AWS.config.update({ region: nconf.get('keys.aws.region') });
AWS.config.accessKeyId = nconf.get('keys.aws.accessKey');
AWS.config.secretAccessKey = nconf.get('keys.aws.secretAccessKey');

// create Nodemailer SES transporter
const transporter = nodemailer.createTransport({
  SES: new AWS.SES({
    apiVersion: '2010-12-01',
  }),
});

// send some mail

const sendEmail = () => new Promise((resolve, reject) => {
  transporter.sendMail({
    from: 'arora_ta@yahoo.in',
    to: 'tarush@mailinator.com',
    subject: 'Message',
    text: 'I hope this message gets sent!',
    // ses: { // optional extra arguments for SendRawEmail
    //   Tags: [{
    //     Name: 'tag name',
    //     Value: 'tag value',
    //   }],
    // },
  }, (err, info) => {
    if (err) {
      reject(err);
    } else {
      resolve(info);
      console.log(info.envelope);
      console.log(info.messageId);
    }
  });
});


module.exports = {
  sendEmail,
};
