'use strict';
const model=require('../models/commentModel')

const getCommentsByClipId=async (req, res) => {
    const data=req.params.id
    const videos=await model.getCommentsByClipId(data, res);
    res.json(videos);
};

const getCommentsByUserId=async (req, res) => {
    const data=req.params.id
    const videos=await model.getCommentsByUserId(data, res);
    res.json(videos);
};

module.exports={
    getCommentsByClipId, getCommentsByUserId,
};