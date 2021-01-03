const express = require('express');
const mongoose = require('mongoose');
const cors = require ('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 4000;
//storing mongodb in .env file
require('dotenv').config();

//directing to buildfile
app.use(express.static(path.join(__dirname,'/client/build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
//connecting to mongoos through uri
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//once it connects to open show console log so we know
const connection = mongoose.connection;
connection.once('open', () =>
console.log("mongodb connection established successfully")
);

const ordersRouter = require('./routes/orders');
app.use('/orders', ordersRouter);

//running on localhost4000
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'))
})
app.listen(port ,() => console.log(`the app is running on port: ${port}`))