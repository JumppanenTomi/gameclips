"use strict";
const express=require("express");
const router=express.Router();
const controller=require('../controllers/clipController')
const file=require('../utils/file')
const passport=require("../utils/passport");

router
    .post('/', passport.authenticate('jwt', { session: false }), file.upload, controller.uploadClip)//route to post clip
    .delete('/:id', passport.authenticate('jwt', { session: false }), controller.deleteClip);//route to delete clip

router.get('/getRandomQuery', controller.getRandomQuery);//route to get all clips in random order

router.get('/getByGameId/:id', controller.getByGameId);//route to get all clips of specific game in random order

module.exports=router;