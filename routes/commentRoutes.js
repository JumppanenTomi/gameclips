"use strict";
const express=require("express");
const router=express.Router();
const path=require('path');
const controller=require('../controllers/commentController')

router.get('/clip', controller.getCommentsByClipId);

router.get('/user', controller.getCommentsByUserId);

router.post('/', controller.addCommentToClipById);

router.patch('/', controller.modifyCommentByCommentId);

router.delete('/', controller.deleteCommentByCommentId);
module.exports=router;