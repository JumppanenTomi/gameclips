'use strict';
const model=require('../models/browseModel')

const getAll=async (res) => {
    const response=await model.getAll(res);
    res.json(response);
};

module.exports={
    getAll,
};