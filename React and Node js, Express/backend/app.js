const express = require('express'); //Call Express
const app = express(); //create instanse
const cors = require('cors');  // Import Cors
const controller = require('./controller'); //Import controller

//Add Midelware Use
app.use(cors());

app.use(
    express.urlencoded({
        extended: true, // can nexted object encode (false --> Only array and string in encode)
    })  //Use convert decode data to encode data
);

app.use(express.json());  //Response and request data convert joson array

//Creat REST API
app.get('/users', (req, res, next) => {
    controller.getUsers((req, res, next) => {
        res.send();
    });
});


app.post('/createuser', (req, res) => {
    controller.addUser(req.body, (callback) => {
        res.send();
    });
});

app.post('/updateuser', (req, res) => {
    controller.updateUser(req.body, (callback) => {
        res.send(callback);
    });
});

app.post('/deleteuser', (req, res) => {
    controller.deleteUser(req.body, (callback) => {
        res.send(callback);
    });
});

module.exports = app; //Export file (This is a express application)


