'use strict';
const pool=require('../database/db');
const promisePool=pool.promise();
const file=require('../utils/file')

const getRandomQuery=async () => {
    try {
        const sql='SELECT users.username, clips.id, clips.title, clips.description, clips.url FROM users, clips WHERE users.id = clips.userId ORDER BY RAND() LIMIT 100;';
        const [rows]=await promisePool.query(sql)
        return rows;
    } catch (e) {
        console.error("clip error", e.message);
        res.status(500).send(e.message);
    }
};

const uploadClip=async (user, data, file, res) => {
    try {
        const sql='insert into clips (userId, title, description, url) VALUES (?, ?, ?, ?);';
        const values=[user.id, data.title, data.desc, file];
        const [rows]=await promisePool.query(sql, values);
        return "Successfully uploaded";
    } catch (e) {
        console.error("clip error", e.message);
        res.status(500).send(e.message);
    }
};


const deleteClip=async (user, data, res) => {
    try {
        //getting clip url so we know which file to delete...
        let sql='SELECT * FROM clips WHERE id=? and userId=?;'
        const values=[data.id, user.id];
        const [rows1]=await promisePool.query(sql, values);
        file.deleteAsync("./public/"+rows1[0].url)//..deleting file from public folder

        //deleting all comments that are depending on this clip
        sql='DELETE FROM comments WHERE clipId=?;'
        const deleteValues=[data.id];
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
        console.error("clip error", e.message);
        res.status(500).send(e.message);
    }
};

module.exports={
    getRandomQuery, uploadClip, deleteClip
};