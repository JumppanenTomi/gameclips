'use strict';
const model=require('../models/clipModel')

const getAnyClip=async (req, res) => {
    res.json(await model.getAnyClip(res));
};

module.exports={
    getAnyClip,
};