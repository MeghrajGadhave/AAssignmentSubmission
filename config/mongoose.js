const mongoose = require('mongoose');

require('dotenv').config();

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/ecommerce-digitalflake');

const db = mongoose.connection;

db.on('error', () => {
    console.log("error in connect db");
})

db.once('open', () => {
    console.log("DB connect successfully");
})

module.exports = db;