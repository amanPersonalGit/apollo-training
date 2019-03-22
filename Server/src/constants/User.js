let User = [
    {
        id:0,
        name:"Aman",
        email:"aman@gmail.com",
        friends: [1,2],
        messages: [
            {
                to: "Aman",
                from: "Ayush",
                message: "Hello"
            },
            {
                to: "Aman",
                from: "Akash",
                message: "Hi",
            },
        ],
    },
    {
        id:1,
        name:"Akash",
        email:"akash@gmail.com",
        friends: [0,2],
        messages: [
            {
                to: "Akash",
                from: "Ayush",
                message: "Whats up"
            },
            {
                to: "Akash",
                from: "Aman",
                message: "Bye",
            },
        ],
    },
    {
        id:2,
        name:"Ayush",
        email:"ayush@gmail.com",
        friends: [1,0],
        messages: [
            {
                to: "Ayush",
                from: "Aman",
                message: "Hello there"
            },
            {
                to: "Ayush",
                from: "Akash",
                message: "General Kenobi",
            },
        ],
    }
]

module.exports = User;