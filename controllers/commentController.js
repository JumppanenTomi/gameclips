'use strict';
const model=require('../models/commentModel')

const getCommentsByClipId=async (req, res) => {
    const data=req.params.id
    const response=await model.getCommentsByClipId(data, res);
    res.json(response);
};

const getCommentsByUserId=async (req, res) => {
    const data=req.params.id
    const response=await model.getCommentsByUserId(data, res);
    res.json(response);
};

const addCommentToClipById=async (req, res) => {
    const userId=1//muutetaan, kun kirjatuminen valmis
    const response=await model.addCommentToClipById(userId, req.params.comment, req.params.clipId, res);
    res.json(response);
};

const deleteCommentByCommentId=async (req, res) => {
    const userId=1//muutetaan, kun kirjatuminen valmis
    const response=await model.deleteCommentByCommentId(userId, req.params.commentId, res);
    res.json(response);
};

module.exports={
    getCommentsByClipId, getCommentsByUserId, addCommentToClipById, deleteCommentByCommentId
};