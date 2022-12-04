'use strict';
const Model=require('../models/browseModel')

const getHundred=async (req, res) => {
    const videos=await Model.getHundred(res);
    res.json(videos);
};

module.exports={
    getHundred,
};