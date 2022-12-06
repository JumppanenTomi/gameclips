'use strict';
const pool=require('../database/db');
const promisePool=pool.promise();

const getCommentsByClipId=async (data, res) => {
    try {
        const sql='SELECT comments.comment, user.username FROM comments, user WHERE comments.userId = user.id AND comments.clipId = ?;';
        const values=[data]
        const [rows]=await promisePool.query(sql, values);
        return rows;
    } catch (e) {
        console.error("error", e.message);
        res.status(500).send(e.message);
    }
};

const getCommentsByUserId=async (data, res) => {
    try {
        const sql='SELECT comments.comment, user.username FROM comments, user WHERE comments.userId = ?';
        const values=[data]
        const [rows]=await promisePool.query(sql, values);
        return rows;
    } catch (e) {
        console.error("error", e.message);
        res.status(500).send(e.message);
    }
};

module.exports={ getCommentsByClipId, getCommentsByUserId };