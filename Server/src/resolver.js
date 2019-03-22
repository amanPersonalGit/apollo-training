const Users = require('./constants/User');
const CHAT_CHANNEL = 'CHAT_CHANNEL';
const USER_CREATED = 'USER_CREATED';

const resolvers = {
    Query: {
        users(root, args, context) {
            return Users;
        },
        user(root, { id }, context) {
            let theUser;
            Users.forEach(user => {
                if(user.id == id) {
                    theUser = user;
                }
            });
            return theUser;
        },
    },

    Mutation: {
        sendMessage(root, { to, from, message }, { pubsub }) {
            const chat = { to, from, message };
            Users.forEach(user => {
                if(user.name == to) {
                    user.messages.push(chat);
                }
            })
            pubsub.publish(CHAT_CHANNEL, { messageSent: chat })
            return chat;
        },
        addUser(root, {name, email}, { pubsub }) {
            const newUser = {
                id: Users.length + 1,
                name: name,
                email: email,
                friends: [],
                messages: [],
            }
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