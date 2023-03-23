const express = require('express');

function sucess(req, res, message, status){
    res.end(JSON.stringify({
        body: req.body.name,
        status:status,
        message: message
    }));
    
}
function error(req, res, message, status){
    res.end(JSON.stringify({
        body: req.body.name,
        status:status,
        message: message
    }));
}


module.exports = {
    sucess,
    error
}; 