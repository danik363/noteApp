const model = require('./model.js');
const mongoose = require('mongoose');

function create(user){

    const result = new model(user);
    
    return result.save();
}

async function listUsers(filter){
    console.log(filter);
    return await model.find(filter);
}

module.exports = {
    create,
    listUsers
}