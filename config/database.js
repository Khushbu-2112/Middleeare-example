const mongoose = require('mongoose');

require('dotenv').config();

const conn = process.env.DB_STRING;

const connection = mongoose.createConnection(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) // can't use then catch with this just removing them err gone for conn.model is not a function

const userSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    admin: Boolean
});

const User = connection.model('User', userSchema);

module.exports = connection;