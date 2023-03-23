const mongoose = require('mongoose');

const user = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    name: String,
    surname: String,
    createDate: Date
});

const model = mongoose.model('Users', user);

module.exports = model;