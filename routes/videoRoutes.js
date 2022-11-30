"use strict";
const express=require("express");
const router=express.Router();
const videoController=require('../controllers/videoController')

router.get('/getVideo', videoController.video_get_videos);

router.get('/getVideo/:id', videoController.video_get_video);

module.exports=router;