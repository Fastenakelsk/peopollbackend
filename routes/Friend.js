const express = require('express');
const router = express.Router();

const Friend = require('../models/Friend');

//Post 1 friendship
router.post('/friends', async (req, res) => {
    console.log(req.body.sender);
    console.log(req.body.receiver);
    const friend = new Friend({
        sender: req.body.sender,
        receiver: req.body.receiver
        });
    try{
        const savedFriend = await friend.save();
        res.json({ "success": true, message: "Friend saved" })
    }catch(err){
        res.json({ "success": false, msg: 'Failed to save friend' })
    }
});

//Get 1 friendship
router.get('/friends/oneFriendship/:sender/:receiver', async (req, res) => {
    try{
        const friendshipOne = await Friend.findOne({ sender: req.params.sender, receiver: req.params.receiver })
        const friendshipTwo = await Friend.findOne({ sender: req.params.receiver, receiver: req.params.sender })
        if(friendshipOne == null && friendshipTwo == null){
            res.json({ "success": true, message: "Friendship doesn't exist" })
        }else{
            res.json({ "success": false, message: "Friendship already exists" })
        }
    }catch(err){
        res.json({ "success": false, msg: 'Error in making friendship' })
    }
});

//Get all friendships of one user by username
router.get('/friends/allFriendships/:username', async (req, res) => {
    try{
        const friends = await Friend.find({ sender: req.params.username });
        const moreFriends = await Friend.find({ receiver: req.params.username});
        const allFriends = [];
        for(friend in friends){
            allFriends.push(friends[friend].receiver);
        }
        for(friend in moreFriends){
            allFriends.push(moreFriends[friend].sender);
        }
        res.json(allFriends)
    }catch(err){
        res.json({ "success": false, msg: 'Error in finding friends' })
    }
});

module.exports = router;