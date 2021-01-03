//schema for mongodb

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//cant submit without input
const orderSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    productno: { type: String, required: true},
    image: {type: String, required: true}

})

const Orders = mongoose.model("Orders", orderSchema);

module.exports = Orders;