const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

//Needed to let server understand JSON
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Import routes 
const tasksRoute = require('./routes/task');

app.use('/', tasksRoute);
app.use('/tasks', tasksRoute);

//DB Connection - DB connection string from .env file -> .env.example pushed to Github
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => console.log('Database Connection Success!')
);

//Port
app.listen(3000);