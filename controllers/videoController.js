'use strict';

const video_get_videos=(req, res) => {
    res.json("here is 10 videos")
};

const video_get_video=(req, res) => {
    res.json("here is "+req.params.id)
};

module.exports={
    video_get_videos, video_get_video,
};