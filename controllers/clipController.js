'use strict';
const model=require('../models/clipModel')

const getAnyClip=async (req, res) => {
    res.json(await model.getAnyClip(res));
};

const uploadClip=async (req, res) => {
    if (req.file!=undefined) {
        const data=req.params
        const response=await model.uploadClip(1, data, req.file.filename, res);
        res.json(response);
    } else {
        res.status(400).send('There was no file');
    }
};

module.exports={
    getAnyClip, uploadClip
};