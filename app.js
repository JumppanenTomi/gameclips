'use strict';
const express=require('express');
const session=require('express-session');
const app=express();
const cors=require('cors');

const port=3000;

const clipRoutes=require('./routes/clipRoutes');
const browseRoutes=require('./routes/browseRoutes');
const commentRoutes=require('./routes/commentRoutes');
const profileRoutes=require('./routes/profileRoutes');

app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use('/static', express.static('public'))

app.get('/', function (req, res) {
    res.redirect('https://github.com/JumppanenTomi/gameclips-backend/tree/main');
});

app.use('/clip', clipRoutes);
app.use('/browse', browseRoutes);
app.use('/comment', commentRoutes);
app.use('/profile', profileRoutes);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
