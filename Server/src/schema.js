const typeDefs = `
type Messages {
    to: String!
    from: String!
    message: String!
}

type Query {
    users: [User]
    user(
    id: ID!
    ): User
}

type User {
    id: ID!
    name: String!
    email: String!
    friends: [ID]
    messages: [Messages]
}

type Mutation {
    sendMessage(to: String!, from: String!, message: String!): Messages
    addUser(name: String!, email: String!): User
}

type Subscription {
    messageSent: Messages
    userCreated: User
}`

module.exports = typeDefs;  