const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
bcrypt = require('bcrypt'),
saltRounds = 10;

const User = require('../models/User');

//Authenticate
router.post('/users/authenticate', async (req, res) => {
    console.log('Did router.post -> authenticate');
    const username = req.body.username,
        password = req.body.password;
    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        
        console.log(user);
        if(!user){
            return res.json({success: false, message: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({ data: user }, process.env.SECRET, {
                    expiresIn: 604800
           });
                res.json({
                    success: true,
                    token: 'Bearer '+token,
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email
                    }
                });
            }else{
                return res.json({success: false, message: 'Wrong password'});
            }
        });
    });
});

//Dashboard
router.get('/users/dashboard', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    console.log('Did router.get -> dashboard');
    res.json({user: req.user});
});

//Get all user
router.get('/users', async (req, res)=> {
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.json({message: err});
    }
});

//Get 1 user by username
router.get('/users/:username', async (req, res) => {
    try{
        const userByUsername = await User.findOne({ username: req.params.username })
        res.json(userByUsername);
    }catch(err){
        res.json({message: err});
    }
});

//Post 1 user
router.post('/users', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
        });
    try{
        const savedUser = await user.save();
        res.json({ "success": true, message: "User Added" })
    }catch(err){
        res.json({ "success": false, msg: 'Failed to register User' })
    }
});

//Delete 1 user
router.delete('/users/:userID', async (req, res) => {
    try{
        const deleteUser = await User.deleteOne({_id: req.params.userID});
        res.json(deleteUser);
    }catch(err){
        res.json({message: err});
    }
});

//Patch 1 user's password
router.patch('/users/:userID', async (req, res) => {
    try{
        const password = req.body.password;
        hash = await new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, function(err, hash) {
                if (err) reject(err)
                resolve(hash)
              });
        });
        const updateUser = await User.updateOne(
            { _id: req.params.userID }, 
            { $set: 
                {
                    password: hash
                }
        });
        res.json(updateUser);  
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;