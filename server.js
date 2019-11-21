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
const tasksRoute = require('./routes/task');
const usersRoute = require('./routes/User');

app.use('/', tasksRoute);
app.use('/tasks', tasksRoute);

app.use('/', usersRoute);
app.use('/users', usersRoute);

//DB Connection - DB connection string from .env file -> .env.example pushed to Github
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => console.log('Database Connection Success!')
);

//Port
app.listen(3000, () =>{
    console.log('Server Start Success!')
});