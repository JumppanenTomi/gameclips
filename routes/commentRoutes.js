"use strict";
const express=require("express");
const router=express.Router();
const path=require('path');
const controller=require('../controllers/commentController')

router.get('/clip/:id', controller.getCommentsByClipId);

router.get('/user/:id', controller.getCommentsByUserId);

router.post('/:clipId/:comment', controller.addCommentToClipById);

router.delete('/:commentId', controller.deleteCommentByCommentId)
module.exports=router;