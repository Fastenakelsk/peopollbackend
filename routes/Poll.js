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
router.get('/polls/:username', async (req, res) => {
    try{
        const madePolls = await Poll.find({creator: req.params.username});
        const InvitedPolls = await Poll.find({invitedUsers: [req.params.username]});
        const votedInPolls = await Poll.find({votedUsers: [req.params.username]});
        const allPolls = [];
        for(poll in madePolls){
            allPolls.push(madePolls[poll]);
        }
        for(poll in InvitedPolls){
            allPolls.push(InvitedPolls[poll]);
        }
        for(poll in votedInPolls){
            allPolls.push(votedInPolls[poll]);
        }
        console.log("All Polls");
        console.log(allPolls);
        console.log("Made Polls");
        console.log(madePolls);
        console.log("Invited Polls");
        console.log(InvitedPolls);
        console.log("Voted In Polls");
        console.log(votedInPolls);
        res.json(allPolls);
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

module.exports = router;