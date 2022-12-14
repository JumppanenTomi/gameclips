'use strict';
const pool=require('../database/db');
const promisePool=pool.promise();

const getUserProfileById=async (data, res) => {
    try {
        let sql='SELECT id, username FROM users WHERE id = ?;';//to get users profile
        const values=[data.id];
        const [rowsUser]=await promisePool.query(sql, values);

        sql='SELECT id, title, description, url FROM clips WHERE userId = ?;';//to get users clips
        const [rowsClips]=await promisePool.query(sql, values);

        let [combinedJson]=rowsUser;
        combinedJson.clips=rowsClips;

        return combinedJson;
    } catch (e) {
        console.error("profile error", e.message);
        res.status(500).send(e.message);
    }
};

module.exports={
    getUserProfileById,
};