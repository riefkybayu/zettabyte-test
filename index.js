const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const user = require("./models/user");

var app = express();
app.use(cors());
app.use(bodyparser.json());

mongoose.connect('mongodb+srv://bayu:UCEK5Ts6LoiaFusU@riefkybayu-ox7jc.mongodb.net/zetta-test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get("/api/user/", (req, res) => {
    user.find().exec()
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send(err));
});

app.get("/api/user/:name", (req, res) => {
    user.find({name:req.params.name}).exec()
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send(err));
});

app.post("/api/user/", (req, res) =>{
    const new_user = new user({
        name : req.body.name,
        age : req.body.age,
        email : req.body.email,
        address : req.body.address
    });
    new_user.save().then(result => res.status(200).send(result))
    .catch(err => res.status(500).send(err));
});

app.put("/api/user/:name", (req, res) => {
    user.updateMany({name:req.params.name}, {
        name : req.body.name,
        age : req.body.age,
        email : req.body.email,
        address : req.body.address
    }).exec()
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send(err));
});

app.delete("/api/user/:name", (req, res) => {
    user.remove({name:req.params.name}).exec()
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send(err));
});

app.listen(3000, () => {
    console.log("App listening from port 3000");
})