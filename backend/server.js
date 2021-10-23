const User = require("./models/user");
const express = require('express')
const mongoose = require("mongoose");
const passport = require('passport');
const jwt = require('jsonwebtoken');
// const { createAdapter } = require("@socket.io/redis-adapter");
const { createClient } = require("redis");
const cors = require('cors');
const app = express()
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
// const pubClient = createClient({ host: "localhost", port: 6379 });
// const subClient = pubClient.duplicate();

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["*"],
        credentials: true
    }
});

// io.adapter(createAdapter(pubClient, subClient));

io.on('connection', (socket) => {
    // console.log('a user connected', socket);
    console.log(pubClient);
});

const Strategy = require('passport-http-bearer').Strategy;
const userRouter = require("./routes/users")
const todoRouter = require("./routes/todos")



app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
require('./middlewares/auth');
const port = 5000


app.use("/users", userRouter)
app.use("/todos", todoRouter)
app.use(passport.initialize());

mongoose.connect('mongodb://localhost:27017/test');
app.get('/', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.send("Hello World");
    }
);

app.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
        res.json({
            message: 'Signup successful',
            user: req.user
        });
    }
);

app.post(
    '/login',
    async (req, res, next) => {
        passport.authenticate(
            'login',
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        const error = new Error('An error occurred.');

                        return next(error);
                    }

                    req.login(
                        user,
                        { session: false },
                        async (error) => {
                            if (error) return next(error);

                            const body = { _id: user._id, email: user.email };
                            const token = jwt.sign({ user: body }, 'TOP_SECRET');

                            return res.json({ token });
                        }
                    );
                } catch (error) {
                    return next(error);
                }
            }
        )(req, res, next);
    }
);

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})