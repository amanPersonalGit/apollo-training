const Users = require('./constants/User');
const Messages = require('./constants/Messages');
const CHAT_CHANNEL = 'CHAT_CHANNEL';
const USER_CREATED = 'USER_CREATED';

const resolvers = {
    Query: {
        users(root, args, context) {
            return Users;
        },
        friends(root, { name }, context) {
            let Friends = [];
            Users.forEach(user => {
                if(user.name == name) {
                    return user.friends.map(id => {
                        Users.forEach(myUser => {
                            if(myUser.id == id) {
                                Friends.push(myUser.name);
                            }
                        })
                    });
                }
            });
            return Friends;
        },
        user(root, { name, email }, context) {
            let newUser;
            Users.forEach(user => {
                if(user.name == name && user.email == email) {
                    newUser = user;
                }
            });
            return newUser;
        },
        messages(root, { to, from }, context) {
            UserMessages = [];
            Messages.forEach(message => {
                if((message.to == to && message.from == from)||(message.to == from && message.from == to)) {
                    UserMessages.push(message);
                }
            })
            return UserMessages;
        }
    },

    Mutation: {
        sendMessage(root, { to, from, message }, { pubsub }) {
            const chat = { to, from, message };
            Messages.push(chat);
            pubsub.publish(CHAT_CHANNEL, { messageSent: chat })
            return chat;
        },
        addUser(root, {name, email}, { pubsub }) {
            const newUser = {
                id: Users.length + 1,
                name: name,
                email: email,
                friends: Users.map(user => user.id),
            }
            Users.forEach(user => user.friends.push(newUser.id));
            Users.push(newUser);
            pubsub.publish(USER_CREATED, { userCreated: newUser })
            return newUser;
        }
    },

    Subscription: {
        messageSent: {
            subscribe: (root, args, { pubsub }) => {
                return pubsub.asyncIterator(CHAT_CHANNEL);
            }
        },
        userCreated: {
            subscribe: (root, args, { pubsub }) => {
                return pubsub.asyncIterator(USER_CREATED);
            }
        }
    }
}

module.exports = resolvers;