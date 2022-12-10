"use strict";

const pool=require("../database/db");
const promisePool=pool.promise();

const getUserLogin=async (data) => {
    try {
        const [rows]=await promisePool.execute('SELECT * FROM users WHERE email = ?;', data);
        return rows;
    } catch (e) {
        console.error("user error", e.message);
    }
};

const addUser=async (username, email, password) => {
    try {
        const [rows]=await promisePool.query("INSERT INTO users(username, email, password) VALUES(?, ?, ?);",
            [username, email, password]);
        console.log('userModel add:', rows);
        return rows;
    } catch (e) {
        console.error("userModel adduser:", e);
        return 0;
    }
};

module.exports={
    getUserLogin, addUser,
};