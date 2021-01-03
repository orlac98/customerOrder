const express = require('express');
const router = express.Router();
//route our application
//link to schema
const Orders = require("../models/orders");
const multer = require("multer");

//using multer to store images
//destination of images in public folder
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./client/public/uploads")
    },
    filename: (req, file, callback) => {
        //name of image will be what its called when u upload it from computer
        callback(null, file.originalname);
    }
})

const upload = multer({storage: storage});

//router url using response from mongodb server 
//schema will find orders and return them
//catch if theres an error 400 will show

//request get all orders
router.get("/", (req, res) => {
    Orders.find()
    .then(order => res.json(order))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

//request add new order
//upload..single beacuse its single file
router.post('/add', upload.single("image"), (req, res) => {
    const newOrder = new Orders({
        name: req.body.name,
        email: req.body.email,
        productno: req.body.productno,
        image: req.file.originalname,
    });

    //save to database and if theres an error , error will show
    newOrder
    .save()
    .then(() => res.json("The new Order has been added"))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

//request find order by id
//look for order by id and then display
router.get('/:id', (req, res) => {
    Orders.findById(req.params.id)
    .then(order => res.json(order)
    .catch(err => res.status(400).json(`Error: ${err}`)))
})


//request find order by id and update 
//get schema from db 
router.put('/update/:id', upload.single("image"), (req,res) => {
    Orders.findById(req.params.id)
    .then(order => {
        order.name = req.body.name;
        order.email = req.body.email;
        order.productno = req.body.productno;
        order.image = req.file.originalname;

        order
        .save()
        .then(() => res.json("The Order has been updated successfully"))
        .catch(err => res.status(400).json(`Error: ${err}`))
    })
    //catch error if its to do with schema
    .catch(err => res.status(400).json(`Error: ${err}`))
});


//request find order by id and delete
//search schema and delete by id
router.delete('/:id', (req,res) => {
    Orders.findByIdAndDelete(req.params.id)
    .then(() => res.json("The Order has been deleted"))
    .catch(err => res.status(400).json(`Error: ${err}`))
})




module.exports = router;