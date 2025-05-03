const express = require('express'); //Call Express
const app = express(); //create instanse
const cors = require('cors');  // Import Cors

const port = 3001; // Define port
const host = 'localhost';

const mongoose = require('mongoose');
const router = require('./router');

app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://root:root123@cluster0.ge5re.mongodb.net/'

const connect = async () => {
    try{
        await mongoose.connect(uri);
        console.log("Connect to MongoDB");
    }
    catch (error){
        console.log("MongoDB Error:", error);
    }
};

connect();

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});

app.use('/api', router);
