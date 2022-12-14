"use strict";
const express=require("express");
const router=express.Router();
const controller=require('../controllers/commentController')
const passport=require("../utils/passport");

router.get('/clip:id', controller.getCommentsByClipId);//route to get comments posted to specific clip

router.get('/user', passport.authenticate('jwt', { session: false }), controller.getCommentsByUserId);//route to get comments posted by this user

router
    .post('/', passport.authenticate('jwt', { session: false }), controller.addCommentToClipById)//route to add comment to clip
    .patch('/', passport.authenticate('jwt', { session: false }), controller.modifyCommentByCommentId)//route to modify comment
    .delete('/', passport.authenticate('jwt', { session: false }), controller.deleteCommentByCommentId);//route to delete comment

module.exports=router;