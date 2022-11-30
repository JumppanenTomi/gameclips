"use strict";
const express=require("express");
const router=express.Router();
const joinController=require('../controllers/joinController')

router.get('/login', joinController.login);

router.get('/register', joinController.register);

module.exports=router;