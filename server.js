const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
require('dotenv/config');

const app = express();

//Needed to let server understand JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//CORS -> Cross Origin Resource Sharing
app.use(cors());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./passport')(passport);

//Import routes
const usersRoute = require('./routes/User');
const requestsRoute = require('./routes/Request');
const friendsRoute = require('./routes/Friend');
const pollRoute = require('./routes/Poll');

app.use('/', usersRoute);
app.use('/users', usersRoute);

app.use('/', requestsRoute);
app.use('/requests', requestsRoute);
app.use('/requests/received', requestsRoute);
app.use('/requests/sent', requestsRoute);

app.use('/', friendsRoute);
app.use('/friends/oneFriendship', friendsRoute);
app.use('/friends/allFriendships', friendsRoute);

app.use('/', pollRoute);
app.use('/polls', pollRoute);
app.use('/polls/byID', pollRoute);
app.use('/polls/byUsername', pollRoute);

//DB Connection - DB connection string from .env file -> .env.example pushed to Github
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => console.log('Database Connection Success!')
);

//Port
app.listen(3000, () =>{
    console.log('Server Start Success!')
});