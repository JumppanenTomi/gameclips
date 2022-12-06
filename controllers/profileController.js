'use strict';
const model=require('../models/profileModel')

const getUserProfileById=async (req, res) => {
    res.json(await model.getUserProfileById(req.params.id, res));
};

module.exports={
    getUserProfileById,
};