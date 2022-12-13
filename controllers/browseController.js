'use strict';
const model=require('../models/browseModel')

const getAll=async (req, res) => {
    res.json(await model.getAll(res));
};

const getAllWithClips=async (req, res) => {
    res.json(await model.getAllWithClips(res));
};

const search=async (req, res) => {
    const data=req.body
    const response=await model.search(data, res);
    res.json(response);
};

module.exports={
    getAll, search, getAllWithClips
};