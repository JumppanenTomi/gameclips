"use strict";
const express=require("express");
const router=express.Router();
const controller=require('../controllers/browseController')

router.get('/', controller.getAll);

router.post('/search', controller.search);

module.exports=router;