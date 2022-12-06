'use strict';
const pool=require('../database/db');
const promisePool=pool.promise();

const getUserProfileById=async (userId, res) => {
    try {
        let sql='SELECT id, username FROM users WHERE id = ?;';
        const values=[userId];
        const [rowsUser]=await promisePool.query(sql, values);

        sql='SELECT id, title, description, url FROM clips WHERE userId = ?;';
        const [rowsClips]=await promisePool.query(sql, values);

        let [combinedJson]=rowsUser;
        combinedJson.clips=rowsClips;

        return combinedJson;
    } catch (e) {
        console.error("error", e.message);
        res.status(500).send(e.message);
    }
};

module.exports={
    getUserProfileById,
};