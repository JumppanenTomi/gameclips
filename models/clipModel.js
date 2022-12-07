'use strict';
const pool=require('../database/db');
const promisePool=pool.promise();
const fs=require('../utils/fileDeletion')

const getRandomQuery=async () => {
    try {
        const sql='SELECT users.username, clips.id, clips.title, clips.description, clips.url FROM users, clips WHERE users.id = clips.userId ORDER BY RAND() LIMIT 3;';
        const [rows]=await promisePool.query(sql)
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

const deleteClip=async (userId, clipId, res) => {
    try {
        //getting clip url so we know which file to delete...
        let sql='SELECT url FROM clips WHERE id=? and userId=?;'
        const values=[clipId, userId];
        const [rows1]=await promisePool.query(sql, values);
        fs.deleteAsync("./public/"+rows1[0].url)//..deleting file from public folder

        //deleting all comments that are depending on this clip
        sql='DELETE FROM comments WHERE clipId=?;'
        const deleteValues=[clipId];
        const [rows2]=await promisePool.query(sql, deleteValues);

        //deleting all likes that are depending on this clip
        sql='DELETE FROM likes WHERE clipId=?;'
        const [rows3]=await promisePool.query(sql, deleteValues);

        //deleting all favorites that are depending on this clip
        sql='DELETE FROM favorites WHERE clipId=?;'
        const [rows4]=await promisePool.query(sql, deleteValues);

        //and lastly deleting rest data of clip it self
        sql='DELETE FROM clips WHERE id=? and userId=?;';
        const [rowsFinal]=await promisePool.query(sql, values);

        if (rowsFinal.affectedRows>0) {
            return "Clip, comments, likes, favorites deleted";
        } else {
            return "Something went wrong"
        }
    } catch (e) {
        console.error("error", e.message);
        res.status(500).send(e.message);
    }
};

module.exports={
    getRandomQuery, uploadClip, deleteClip
};