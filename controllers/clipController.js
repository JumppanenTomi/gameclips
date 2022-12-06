'use strict';
const model=require('../models/clipModel')

const getRandomQuery=async (req, res) => {
    res.json(await model.getRandomQuery(res));
};

const uploadClip=async (req, res) => {
    if (req.file!=undefined) {
        const response=await model.uploadClip(1, req.params, req.file.filename, res);
        res.json(response);
    } else {
        res.status(400).send('There was no file');
    }
};

module.exports={
    getRandomQuery, uploadClip
};