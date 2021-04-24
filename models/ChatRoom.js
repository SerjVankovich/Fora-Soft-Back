module.exports.ChatRoom = class ChatRoom {
    constructor(name, users, messages) {
        this.name = name;
        this.users = users;
        this.messages = messages
    }

    addUser(user) {
        this.users = [...this.users, user]
    }

    addMessage(message) {
        this.messages = [...this.messages, message]
    }
};
