'use strict';
const browseModel=require('../models/browseModel')

const getAll=async (req, res) => {
    const videos=await browseModel.getAll(res);
    res.json(videos);
};

module.exports={
    getAll,
};