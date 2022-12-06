'use strict';
const url='http://localhost:3000'; // change url when uploading to server

// get users to form options
const getListOfRandomGames=async () => {
    try {
        const response=await fetch(url+'/user');
        const users=await response.json();
        createUserOptions(users);
    } catch (e) {
        console.log(e.message);
    }
};
getListOfRandomGames();

