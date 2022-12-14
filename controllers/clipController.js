'use strict';
const model=require('../models/clipModel')

const getRandomQuery=async (req, res) => {
    res.json(await model.getRandomQuery(res));
};

const getByGameId=async (req, res) => {
    res.json(await model.getByGameId(req.params.id, res));
};

const uploadClip=async (req, res) => {
    const user=req.user
    const data=req.body

    //if there was no file sent we give error
    if (req.file!=undefined) {
        const response=await model.uploadClip(user, data, req.file.filename, res);
        res.json(response);
    } else {
        res.status(400).send('There was no file');
    }
};

const deleteClip=async (req, res) => {
    const user=req.user
    const data=req.params;
    res.json(await model.deleteClip(user, data, res));
};

module.exports={
    getRandomQuery, uploadClip, deleteClip, getByGameId,
}