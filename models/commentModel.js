'use strict';
const pool=require('../database/db');
const promisePool=pool.promise();

const getCommentsByClipId=async (data, res) => {
    try {
        const sql='SELECT comments.comment, users.username FROM comments, users WHERE comments.userId = users.id AND comments.clipId = ?;';
        const values=[data.id]
        const [rows]=await promisePool.query(sql, values);
        return rows;
    } catch (e) {
        console.error("error", e.message);
        res.status(500).send(e.message);
    }
};

const getCommentsByUserId=async (data, res) => {
    try {
        const sql='SELECT comments.comment, users.username FROM comments, users WHERE comments.userId = ?';
        const values=[data.id]
        const [rows]=await promisePool.query(sql, values);
        return rows;
    } catch (e) {
        console.error("error", e.message);
        res.status(500).send(e.message);
    }
};

const addCommentToClipById=async (userId, data, res) => {
    try {
        const sql='insert into comments (comment, userId, clipId) VALUES (?, ?, ?);';
        const values=[data.comment, userId, data.id];
        const [rows]=await promisePool.query(sql, values);
        return "Comment posted";
    } catch (e) {
        console.error("error", e.message);
        res.status(500).send(e.message);
    }
};

const deleteCommentByCommentId=async (userId, data, res) => {
    try {
        const sql='DELETE FROM comments WHERE id=? and userId=?;';
        const values=[data.id, userId];
        const [rows]=await promisePool.query(sql, values);
        if (rows.affectedRows>0) {
            return "Comment deleted";
        } else {
            return "Something went wrong"
        }
    } catch (e) {
        console.error("error", e.message);
        res.status(500).send(e.message);
    }
};

const modifyCommentByCommentId=async (userId, data, res) => {
    try {
        const sql='update comments set comment = ? where id = ? and userId = ?';
        const values=[data.comment, data.id, userId];
        const [rows]=await promisePool.query(sql, values);
        if (rows.affectedRows>0) {
            return "Comment modified";
        } else {
            return "Something went wrong"
        }
    } catch (e) {
        console.error("error", e.message);
        res.status(500).send(e.message);
    }
};

module.exports={ getCommentsByClipId, getCommentsByUserId, addCommentToClipById, deleteCommentByCommentId, modifyCommentByCommentId };