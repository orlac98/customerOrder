const express = require('express');
const mongoose = require('mongoose');
const cors = require ('cors');

const app = express();
const port = process.env.PORT || 4000;
//storing mongodb in .env file
require('dotenv').config();

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
//connecting to mongoos through uri
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//once it conneccts to open show console log so we know
const connection = mongoose.connection;
connection.once('open', () =>
console.log("mongodb connection established successfully")
);

const ordersRouter = require('./routes/orders');
app.use('/orders', ordersRouter);

app.listen(port ,() => console.log(`the app is running on port: ${port}`))