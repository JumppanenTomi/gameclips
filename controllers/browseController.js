'use strict';
const model=require('../models/browseModel')

const getHundred=async (req, res) => {
    const videos=await model.getHundred(res);
    res.json(videos);
};

module.exports={
    getHundred,
};