const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const {Server} = require("socket.io");
const cors = require('cors');
const {Message} = require("./models/Message");
const chatRouter = require('./rotes/chatRouter').ChatRouter;
const CONSTANTS = require('./constants');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: `${CONSTANTS.FRONT}:3001`,
        methods: ["GET", "POST"]
    }
});

const users = [];
const chats = [];

app.locals = {
    users: users,
    chats: chats
};
app.use(cors());
app.use(bodyParser());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});
app.use('/chats', chatRouter);

app.get('/', (req, res) => {
    res.send(`<h1>Hello, world</h1>`)
});

io.on('connection', (socket) => {
    // msg: {text, user, date, chat}
    socket.on('get message', msg => {
        const chat = app.locals.chats.find(chat => chat.name === msg.chat);
        if (!chat) {
            return;
        }
        chat.addMessage(new Message(msg.text, msg.user, msg.date));
        io.emit(`get message${msg.chat}`, msg);
    });
    // member: {name, chat}
    socket.on('new member', member => {
        const chat = app.locals.chats.find(chat => chat.name === member.chat);
        if (!chat) {
            return;
        }
        chat.addUser(member.name);
        io.emit(`new member${member.chat}`, member);
    })
});

server.listen(3000, () => {
    console.log('App listened on port 3000')
});
