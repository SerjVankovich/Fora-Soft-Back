const express = require('express');
const {ChatRoom} = require("../models/ChatRoom");
const router = express.Router();


router.get('/getAllChats', (req, res) => {
    res.json(req.app.locals.chats);
});

router.post('/addChat', (req, res) => {
    const {body} = req;
    req.app.locals.chats.push(new ChatRoom(body.name, body.users, body.messages));
    res.json({status: 200});
});

router.get('/:chatName', (req, res) => {
    const {chatName} = req.params;
    const chat = req.app.locals.chats.find(chat => chat.name === chatName);
    res.json(chat);
});

module.exports.ChatRouter = router;
