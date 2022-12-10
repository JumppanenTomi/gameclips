"use strict";
const express=require('express');
const router=express.Router();
const { body }=require('express-validator');
const controller=require('../controllers/authController');
const passport=require("../utils/passport");

router.post('/login', controller.login);
router.post('/logout', passport.authenticate('jwt', { session: false }), controller.logout);
router.post('/register',
    body('username').isLength({ min: 3 }).trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }).trim(),
    controller.register
);

router.get("/token", passport.authenticate('jwt', { session: false }), controller.checkToken);

module.exports=router;