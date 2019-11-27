const express = require('express');
const router = express.Router();

const Poll = require('../models/Poll');

//Post 1 Poll
router.post('/polls', async (req, res) => {
    const poll = new Poll({
        title: req.body.title,
        pollItems: req.body.pollItems,
        creator: req.body.creator,
        invitedUsers: req.body.invitedUsers,
        votedUsers: req.body.votedUsers
        });
    try{
        const savedPoll = await poll.save();
        res.json({ "success": true, message: "Poll saved" })
    }catch(err){
        res.json({ "success": false, msg: 'Failed to save Poll' })
    }
});

//Get polls relating to a username
router.get('/polls/byUsername/:username', async (req, res) => {
    try{
        const allPolls = await Poll.find();
        const relatedPolls = [];
        for(poll in allPolls){
            if(allPolls[poll].creator == req.params.username){
                relatedPolls.push(allPolls[poll]);
            }else{
                if(allPolls[poll].invitedUsers.includes(req.params.username)){
                    relatedPolls.push(allPolls[poll]);
                }else{
                    if(allPolls[poll].votedUsers.includes(req.params.username)){
                        relatedPolls.push(allPolls[poll]);
                    }
                }
            }
        }
        console.log('All Polls');
        console.log(allPolls);
        console.log("Related Polls");
        console.log(relatedPolls);
        res.json(relatedPolls);
    }catch(err){
        res.json({message: err});
    }
});

//Get poll by ID
router.get('/polls/byID/:pollID', async (req, res) => {
    try{
        console.log('get poll by id');
        console.log(req.params.pollID);
        const poll = await Poll.findById(req.params.pollID);
        console.log(poll);
        res.json(poll);
    }catch(err){
        res.json({message: err});
    }
});

//Get all polls
router.get('/polls', async (req, res)=> {
    try{
        const polls = await Poll.find();
        res.json(polls);
    }catch(err){
        res.json({message: err});
    }
});

//Patch 1 poll
router.patch('/polls/:pollID', async (req, res) => {
    try{
        const updatePoll = await Poll.updateOne(
            { _id: req.params.pollID }, 
            { $set: 
                {
                    invitedUsers: req.body.invitedUsers,
                    votedUsers: req.body.votedUsers,
                    pollItems: req.body.pollItems
                }
        });
        res.json(updatePoll);
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;