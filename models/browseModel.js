'use strict';
const pool=require('../database/db');
const promisePool=pool.promise();

const getAll=async (res) => {
    try {
        const sql='SELECT id, name FROM games';
        const [rows]=await promisePool.query(sql);
        return rows;
    } catch (e) {
        console.error("error", e.message);
        res.status(500).send(e.message);
    }
};

module.exports={ getAll };