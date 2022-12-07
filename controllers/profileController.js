'use strict';
const model=require('../models/profileModel')

const getUserProfileById=async (req, res) => {
    const data=req.body
    res.json(await model.getUserProfileById(data, res));
};

module.exports={
    getUserProfileById,
};