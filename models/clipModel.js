'use strict';
const pool=require('../database/db');
const promisePool=pool.promise();

const getAnyClip=async (res) => {
    try {
        const sql='SELECT user.username, clips.title, clips.description, clips.url FROM user, clips WHERE user.id = clips.userId ORDER BY RAND() LIMIT 1;';
        const [rows]=await promisePool.query(sql);
        return rows;
    } catch (e) {
        console.error("error", e.message);
        res.status(500).send(e.message);
    }
};

module.exports={
    getAnyClip,
};