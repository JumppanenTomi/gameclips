'use strict';

const login=(req, res) => {
    res.json("logged in")
};

const register=(req, res) => {
    res.json("registered")
};

module.exports={
    login, register
};