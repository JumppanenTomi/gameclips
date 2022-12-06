'use strict';
const pool=require('../database/db');
const promisePool=pool.promise();

const getAnyClip=async (res) => {
    try {
        const sql='SELECT user.username, clips.id, clips.title, clips.description, clips.url FROM user, clips WHERE user.id = clips.userId ORDER BY RAND() LIMIT 3;';
        const [rows]=await promisePool.query(sql);
        return rows;
    } catch (e) {
        console.error("error", e.message);
        res.status(500).send(e.message);
    }
};

const uploadClip=async (userId, data, file, res) => {
    try {
        const sql='insert into clips (userId, title, description, url) VALUES (?, ?, ?, ?);';
        const values=[userId, data.title, data.desc, file];
        const [rows]=await promisePool.query(sql, values);
        return "Successfully uploaded";
    } catch (e) {
        console.error("error", e.message);
        res.status(500).send(e.message);
    }
};

module.exports={
    getAnyClip, uploadClip
};