'use strict';
const model=require('../models/clipModel')
const badWords=require('bad-words'),
    propaganda=new badWords();

const getRandomQuery=async (req, res) => {
    res.json(await model.getRandomQuery(res));
};

const getByGameId=async (req, res) => {
    res.json(await model.getByGameId(req.params.id, res));
};

const uploadClip=async (req, res) => {
    const user=req.user
    const data=req.body

    //here we censor most of swear words and racism out of title and desc
    req.body.title=propaganda.clean(req.body.title);
    req.body.desc=propaganda.clean(req.body.desc);

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