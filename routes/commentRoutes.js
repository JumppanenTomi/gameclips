"use strict";
const express=require("express");
const router=express.Router();
const controller=require('../controllers/commentController')
const passport=require("../utils/passport");

router.get('/clip', controller.getCommentsByClipId);

router.get('/user', passport.authenticate('jwt', { session: false }), controller.getCommentsByUserId);

router.post('/', passport.authenticate('jwt', { session: false }), controller.addCommentToClipById);

router.patch('/', passport.authenticate('jwt', { session: false }), controller.modifyCommentByCommentId);

router.delete('/', passport.authenticate('jwt', { session: false }), controller.deleteCommentByCommentId);
module.exports=router;