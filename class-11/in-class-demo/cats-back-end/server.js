'use strict'

// requirements for server
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// bring in mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);

// we have to bring in a scheme if we want to interact with that model
const Cat = require('./models/cat.js');
const req = require('express/lib/request');

// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// implement express
const app = express();

// middleware
app.use(cors());

// define PORT validate env is working
const PORT = process.env.PORT || 3002;

// routes
app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
})

app.get('/cats', getCats);

async function getCats(request, response, next) {
  try {
    let queryObject = {}
    if (request.query.location) {
      queryObject.location = request.query.location;
    }
    let results = await Cat.find(queryObject);
    response.status(200).send(results);
  } catch(err) {
    next(err);
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
})

// error
app.use((error, request, response, next) => {
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on Port ${PORT}`));
