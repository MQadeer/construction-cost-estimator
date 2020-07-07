const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const materialsRouter = require('./routes/materials');
const loginRouter = require("./routes/login");
const architectsRoute = require("./routes/architects");
const buildersRoute = require("./routes/builders");
const chatRoute = require("./routes/chats");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const stripe = require("stripe")("sk_test_51Grn9xAcjRPhUTEW5GSC1SlKDjZpWy55QJqgf1jvFzVOlh627IXHAYY5SVuPh7XqFPVlMCAaEm4WJjPvoeDlFexy00YpNP7QXv");
const http = require('http');
const socketio = require('socket.io');
const MongoClient = require('mongodb').MongoClient;
const uri = require("./db/db");
const uuid=require("uuid/v4")
const app = http.createServer(server);

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');


const io = socketio(app);


server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json());
server.use(passport.initialize())
server.use(session({
    secret: "abcd"
}))
server.use(cookieParser())

io.on('connect', (socket) => {
    // socket.on('join', ({ logeduser, architect, room }, callback) => {

    //     const { error, user } = addUser({ id: logeduser._id, name: logeduser.name, room });

    //     // if (error) return callback(error);

    //     socket.join(user.room);
    //     MongoClient.connect(uri, { useNewUrlParser: true })
    //         .then(client => {
    //             const collection = client.db("cce").collection("chatRooms");
    //             collection.updateOne({ room: user.room }, { $set: { room: user.room, publicUser: logeduser, architect: architect } },
    //                 { upsert: true }, function (resp) {
    //                     console.log(resp);
    //                 })
    //         })
    // });
    socket.on('join', ({ logeduser, room }, callback) => {

        const { error, user } = addUser({ id: logeduser._id, name: logeduser.name, room });

        // if (error) return callback(error);

        socket.join(room);
        
        MongoClient.connect(uri, { useNewUrlParser: true })
            .then(client => {
                const collection = client.db("cce").collection("chatRooms");
                collection.updateOne({ room: user.room },{ $set: { room: user.room,publicUser:{name:logeduser.name} } },
                    { upsert: true }, function (resp) {
                        console.log(resp);
                    })
            })
    });

    socket.on('sendMessage', (message, logeduser, callback) => {
        const user = getUser(logeduser._id);

        io.to(user.room).emit('message', { user: user.name, text: message });
        // callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
    })
});


server.use("/materials", materialsRouter);
server.use("/login", loginRouter);
server.use("/architects", architectsRoute);
server.use("/builders", buildersRoute);
server.use("/chats", chatRoute);

server.post("/checkout", async (req, res) => {
    console.log("Request:", req.body);

    let error;
    let status;
    try {
        const { amount, token } = req.body;

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const idempotencyKey = uuid();
        const charge = await stripe.charges.create(
            {
                amount: parseInt(amount),
                currency: "usd",
                customer: customer.id,
                receipt_email: token.email,
                // description: `Purchased the ${product.name}`,
                // shipping: {
                //     name: token.card.name,
                //     address: {
                //         line1: token.card.address_line1,
                //         line2: token.card.address_line2,
                //         city: token.card.address_city,
                //         country: token.card.address_country,
                //         postal_code: token.card.address_zip
                //     }
                // }
            },
            {
                idempotencyKey
            }
        );
        console.log("Charge:", { charge });
        res.send("success")
    } catch (error) {
        console.error("Error:", error);
        res.send("failure")
    }

});


server.use(express.static('./static'))
const port = process.env.PORT || 5000;

app.listen(process.env.PORT || 5000, '0.0.0.0', () => { console.log(`server is listening at port ${port}`) }); ""