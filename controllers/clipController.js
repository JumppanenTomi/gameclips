'use strict';
const model=require('../models/clipModel')


const getRandomQuery=async (req, res) => {
    res.json(await model.getRandomQuery(res));
};

const uploadClip=async (req, res) => {
    const userId=1//muutetaan, kun kirjatuminen valmis

    const data=req.body
    if (req.file!=undefined) {
        const response=await model.uploadClip(userId, data, req.file.filename, res);
        res.json(response);
    } else {
        res.status(400).send('There was no file');
    }
};

const deleteClip=async (req, res) => {
    const userId=1;//muutetaan, kun kirjatuminen valmis

    const data=req.body;
    res.json(await model.deleteClip(userId, data, res));
};

module.exports={
    getRandomQuery, uploadClip, deleteClip
};