'use strict';
const express=require('express');
const app=express();
const cors=require('cors');
const port=3000;

const clipRoutes=require('./routes/clipRoutes');
const browseRoutes=require('./routes/browseRoutes');
const commentRoutes=require('./routes/commentRoutes');
const insertRoutes=require('./routes/insertRoutes');

app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use('/static', express.static('public'))

//routes that anonymous people can access
app.use('/clips', clipRoutes);
app.use('/browse', browseRoutes);
app.use('/comments', commentRoutes);


//routes that only logged-in users can access
app.use('/insert/', insertRoutes);

//routes that only moderators can access

//routes that only admin can access

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
