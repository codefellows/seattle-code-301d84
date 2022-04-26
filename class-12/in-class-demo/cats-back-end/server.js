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
// If we want to recieve json data from a request we need this:
app.use(express.json());

// define PORT validate env is working
const PORT = process.env.PORT || 3002;

// routes
app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
})

app.get('/cats', getCats);
app.post('/cats', postCats);
app.delete('/cats/:id', deleteCats);

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

async function postCats (request, response, next) {
  console.log(request.body);
  try {
    let createdCat = await Cat.create(request.body);
    response.status(200).send(createdCat);
  } catch(err) {
    next(err);
  }
}

async function deleteCats (request, response, next) {
  let id = request.params.id;
  console.log(id)
  try {
    await Cat.findByIdAndDelete(id);
    response.status(200).send('Cat deleted');
  } catch(err) {
    next(err);
  }
}


app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
})

// error
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on Port ${PORT}`));
