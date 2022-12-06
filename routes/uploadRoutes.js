"use strict";
const express=require("express");
const router=express.Router();
const path=require('path');
const controller=require('../controllers/clipController')
const multer=require('multer');

let storage=multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        let extArray=file.mimetype.split("/");
        let extension=extArray[extArray.length-1];
        cb(null, Date.now()+'-'+file.originalname)
    },
})

let upload=multer({
    storage: storage, fileFilter: function (req, file, cb) {
        var ext=path.extname(file.originalname);
        if (ext!=='.mp4'&&ext!=='.avi') {
            return cb(new Error('Only .mp4 and AVI are supported'))
        }
        cb(null, true)
    }, limits: { fileSize: 50000000 }
})

router.post('/clip/:title/:desc/', upload.single('clip'), controller.uploadClip);


module.exports=router;