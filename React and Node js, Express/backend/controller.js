// const users = [
//     {
//         id : 1,
//         name : "Prasad",
//     },

//     {
//         id : 2,
//         name : "Prasadi",
//     },
// ];


// const { response } = require('./app');
const User = require('./model')

const getUsers = (req, res, next) => { //cb --> callback function
    User.find()
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};

const addUser = (req, res, next) => {
    const user = new User({
        id: req.body.id,
        name: req.body.name,
        age: req.body.age,
        isActive : req.body.isActive,
    });

    user.save()
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.json({ error });
        });
};

// const updateUser = (req, res, next) => {
//     const { id, name } = req.body;
//     User.updateOne({ id: id }, { $set: { name: name } })
//         .then(response => {
//             res.json({ response });
//         })
//         .catch(error => {
//             res.json({ error });
//         });
// }


const updateUser = (req, res, next) => {
    const { name } = req.body;
    const { age } = req.body;
    const { isActive } = req.body;
    const id = req.query.id;  // Extract id from query parameters

    User.updateOne({ id: id }, { $set: { name: name, age:age, isActive:isActive } })
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.json({ error });
        });
};



// const deleteUser = (req, res, next) => {
//     const id = req.body.id;   // Get id from response body
//     User.deleteOne({ id: id })
//         .then(response => {
//             res.json({ response });
//         })
//         .catch(error => {
//             res.json({ error });
//         });
// }

const deleteUser = (req, res, next) => {
    const id = req.query.id; // Get id from query parameter
    User.deleteOne({ id: id })
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.json({ error });
        });
};


//Export functions
exports.getUsers = getUsers;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;




