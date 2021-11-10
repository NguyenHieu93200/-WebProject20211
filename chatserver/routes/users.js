const express = require('express');
const UserModel = require('../models/user');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/register', function (req, res, next) {
    UserModel.create(req.body, function (err, result) {
        if (err) //if error, return status: error, data: err
            res.status(500).json({ status: "error", data: err });
        else {  //if success, return username and email
            res.json({ status: "success", message: "User added successfully!!!", data: (({ username, email }) => ({ username, email }))(result) });
        }
    });
})

router.post('/login', function (req, res, next) {
    UserModel.findOne({ username: req.body.username }, 'password', function (err, result) {
        if (err) {
            res.status(500).json({ status: "error", message: "Not found!", data: req.body.username });
        }
        else {
            result.comparePassword(req.body.password, function (err2, isMatch) {
                if (err2)
                    res.status(500).json({ status: "error", message: "Mismatch", data: req.body.username });
                else {
                    res.json({ status: "success", data: isMatch });
                }
            })
        }
    })
})

module.exports = router;
