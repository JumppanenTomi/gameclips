"use strict";
const pool=require("../database/db");
const promisePool=pool.promise();

const getUserLogin=async (data) => {
    try {
        const [rows]=await promisePool.execute('SELECT * FROM users WHERE email = ?;', data);
        return rows;
    } catch (e) {
        console.log(e.message);
    }
}; 

const addUser=async (username, email, password) => {
    try {
        const [rows]=await promisePool.query("INSERT INTO users(username, email, password) VALUES(?, ?, ?);",
            [username, email, password]);
        return rows;
    } catch (e) {
        console.log(e);
        return 0; 
    }
};

const updateUser=async (user, email, password) => {
    try {
        if (email!=""&&password=="") {
            const sql='update users set email = ? userId = ?';
            const values=[email, user.id];
            const [rows]=await promisePool.query(sql, values);
            console.log('User updated:', rows);
            return rows;
        } else if (password!=""&&email=="") {
            const sql='update users set password = ? userId = ?';
            const values=[password, user.id];
            const [rows]=await promisePool.query(sql, values);
            console.log('User updated:', rows);
            return rows;
        } else if (password!=""&&email!="") {
            const sql='update users set password = ?, email = ? userId = ?';
            const values=[password, email, user.id];
            const [rows]=await promisePool.query(sql, values);
            console.log('User updated:', rows);
            return rows;
        }
    } catch (e) {
        console.error("error:", e);
        return 0;
    }
};

module.exports={
    getUserLogin, addUser, updateUser
};