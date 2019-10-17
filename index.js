const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const user = require("./models/user");
const picture = require("./models/picture");

var app = express();
app.use(cors());
app.use(bodyparser.json());

mongoose.connect('mongodb+srv://bayu:UCEK5Ts6LoiaFusU@riefkybayu-ox7jc.mongodb.net/zetta-test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = dd + '-' + mm + '-' + yyyy;
today_str = today.toString();

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

app.post("/api/user/", async (req, res) =>{
    jumlah = await user.countDocuments().exec().then(result => result).catch(err => console.log(err));
    const new_user = new user({
        user_id : jumlah,
        name : req.body.name,
        age : req.body.age,
        email : req.body.email,
        address : req.body.address
    });
    new_user.save().then(result => res.status(200).send(result))
    .catch(err => res.status(500).send(err));
});

app.put("/api/user/:user_id", (req, res) => {
    user.updateMany({user_id:req.params.user_id}, {
        name : req.body.name,
        age : req.body.age,
        email : req.body.email,
        address : req.body.address
    }).exec()
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send(err));
});

app.delete("/api/user/:user_id", (req, res) => {
    user.remove({user_id:req.params.user_id}).exec()
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send(err));
});

app.get("/api/picture", (req, res) => {
    picture.find().exec()
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send(err));
})

app.get("/api/picture/:pic_id", (req, res) => {
    picture.findOne({pic_id : req.params.pic_id}).exec()
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send(err));
})

app.get("/api/picture/user/:user_id", (req, res) => {
    picture.find({user_id : req.params.user_id}).exec()
    .then(result => {
        user.findOne({user_id : req.params.user_id}).exec()
        .then(result_user => {
            res.status(500).send(JSON.stringify({
                user : result_user,
                pictures : result
            }));
        }).catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
});

app.post("/api/picture/", async(req, res) => {
    jumlah = await picture.countDocuments().exec().then(result => result).catch(err => console.log(err));
    const new_picture = new picture({
        user_id : req.body.user_id,
        pic_id : jumlah,
        pic_name : req.body.pic_name,
        pic_url : req.body.pic_url,
        date : today_str
    });
    new_picture.save()
    .then(async (result) => {
        await user.updateOne({user_id:req.body.user_id}, {$addToSet : {pictures : jumlah}}).exec()
        .then().catch(err => console.log(err));

        res.status(200).send(result);
    })
    .catch(err => res.status(500).send(err));
});


app.delete("/api/picture/:pic_id", (req, res)=> {
    picture.findOneAndDelete({pic_id:req.params.pic_id}).exec()
    .then(result => {
        temp = Number(req.params.pic_id);
        user.updateOne({user_id : result.user_id}, {$pull : {pictures : temp}}).exec()
        .then(result_in => console.log(result_in)).catch(err => console.log(err));

        res.send(result);
    }).catch(err => console.log(err));
});

app.put("/api/picture/:pic_id", (req, res) => {
    picture.updateOne({pic_id : req.params.pic_id}, {
        pic_name : req.body.pic_name,
        pic_url : req.body.pic_url, 
    }).exec()
    .then(result => res.status(200).send(result)).catch(err => res.status(500).send(err));
});

app.listen(3000, () => {
    console.log("App listening from port 3000");
})