const express = require('express');
const router = express.Router();

const Request = require('../models/Request');

//Post 1 request
router.post('/requests', async (req, res) => {
    console.log(req.body.sender);
    console.log(req.body.receiver);
    const request = new Request({
        sender: req.body.sender,
        receiver: req.body.receiver
        });
    try{
        const savedRequest = await request.save();
        console.log('REQUEST => sender: ' + request.sender + '; Receiver: ' + request.receiver)
        res.json({ "success": true, message: "Request sent" })
    }catch(err){
        res.json({ "success": false, msg: 'Failed to send request' })
    }
});

//Get all requests per username
router.get('/requests/:username', async (req, res) => {
    try{
        const requestsByUsername = await Request.find({ receiver: req.params.username })
        res.json(requestsByUsername);
    }catch(err){
        res.json({message: err});
    }
});

//Delete 1 request
router.delete('/requests/:requestID', async (req, res) => {
    try{
        console.log(req.params.requestID);
        const deleteRequest = await Request.deleteOne({_id: req.params.requestID});
        res.json({ "success": true, message: "Request deleted" })
    }catch(err){
        res.json({ "success": false, msg: 'Failed to delete request' })
    }
});

//Get 1 request
router.get('/requests/:sender/:receiver', async (req, res) => {
    try{
        const request = await Request.findOne({ sender: req.params.sender, receiver: req.params.receiver })
        if(request == null){
            res.json({ "success": true, message: "Request not yet sent" })
        }else{
            res.json({ "success": false, message: "Request already sent" })
        }
    }catch(err){
        res.json({ "success": false, msg: 'Error in making request' })
    }
});

module.exports = router;