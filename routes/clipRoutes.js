"use strict";
const express=require("express");
const router=express.Router();
const controller=require('../controllers/clipController')
const file=require('../utils/file')
const passport=require("../utils/passport");

router
    .post('/', passport.authenticate('jwt', { session: false }), file.upload, controller.uploadClip)
    .delete('/:id', passport.authenticate('jwt', { session: false }), controller.deleteClip);

router.get('/getRandomQuery', controller.getRandomQuery);

module.exports=router;