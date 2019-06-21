const mongoose = require('mongoose');

const config = require('../config/config');


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(config.dbUrl, { auto_reconnect: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connecting to the database Successfully'); // eslint-disable-line no-console
});

db.on('error', (error) => {
  console.error(`Error in MongoDb connection: ${error}`); // eslint-disable-line no-console
  mongoose.disconnect();
});

db.on('close', () => {
  console.log('The database is disconnected and try to reconnect the database'); // eslint-disable-line no-console
  mongoose.connect(config.dbUrl, { server: { auto_reconnect: true } });
});

module.exports = db;
