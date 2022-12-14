"use strict";
const express=require("express");
const router=express.Router();
const controller=require('../controllers/browseController')

router.get('/', controller.getAll);//gets list of all games

router.get('/getAllWithClips', controller.getAllWithClips);//route that gets list of all games that have posted videos

router.post('/search', controller.search);//game search engine route

module.exports=router;