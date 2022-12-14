'use strict';
const model=require('../models/commentModel')

const getCommentsByClipId=async (req, res) => {
    const data=req.params
    const response=await model.getCommentsByClipId(data, res);
    res.json(response);
};

const getCommentsByUserId=async (req, res) => {
    const user=req.user;
    const response=await model.getCommentsByUserId(user, res);
    res.json(response);
};

const addCommentToClipById=async (req, res) => {
    const user=req.user;
    const data=req.body;
    const response=await model.addCommentToClipById(user, data, res);
    res.json(response);
};

const deleteCommentByCommentId=async (req, res) => {
    const user=req.user;
    const data=req.body
    const response=await model.deleteCommentByCommentId(user, data, res);
    res.json(response);
};

const modifyCommentByCommentId=async (req, res) => {
    const user=req.user;
    const data=req.body
    const response=await model.modifyCommentByCommentId(user, data, res);
    res.json(response);
};

module.exports={
    getCommentsByClipId, getCommentsByUserId, addCommentToClipById, deleteCommentByCommentId, modifyCommentByCommentId
};