const mongoose = require('mongoose');

const connectMongo = (mongoURI) => {
  mongoose.connect(mongoURI, { useNewUrlParser: true });
  mongoose.connection.on('error', () => {
    process.exit();
  });
};


module.exports = {
  connectMongo,
};
