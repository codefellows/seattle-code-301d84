'use strict';

console.log('our first server');

// REQUIRES
// In our servers, we have to 'require' intsead of import.
// Here we will list the requirement for a server
const express = require('express');
require('dotenv').config();
let data = require('./data/pets.json');
// we musts include cors if we want to share resources over the web
const cors = require('cors');

// USE
// Once we have required something, we we have to use it.
// This iss where we assign the required file a variable
// React does thiss in one step with 'import', it sayss we must use it and it assign to a variable. Express takes 2 steps, require and use.
// this is just how Express works
const app = express();
app.use(cors());

// define PORT and validate that my env is working
const PORT = process.env.PORT || 3002;
// I know something is wrong with my env or how I'm importing it if my server is running on 3002

// ROUTES
// We will use these as our endpoint
// create a basic default route.
// app.get correlates to axios.get
// the firsts parametere is the URL in quotes


app.get('/', (request, response) => {
  response.send('Hello, from our server');
});

app.get('/sayHello', (request, response) => {
  console.log(request.query.name);
  let name = request.query.name
  let lastName = request.query.lastName;
  response.send(`Hello, ${name} ${lastName}`);
});

app.get('/pet', (request, response, next) => {
  try {
    let species = request.query.species;
    let petObj = data.find(pet => pet.species === species)
    let selectedPet = new Pet(petObj);
    response.send(selectedPet);
  } catch(error) {
    next(error);
  }
});

// at the bottom of all our routes:
app.get('*', (request, response) => {
  response.send('Not sure what you are a looking for, but it isn\'t here.');
});


// ERRORS
// Handle any errors
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// CLASSES
class Pet {
  constructor(petObject) {
    this.name = petObject.name;
    this.breed = petObject.breed;
  }
}

// LISTEN
// Start the server
// listen is an Expresss method that takes in a Port value and a callback function
app.listen(PORT, () => console.log(`listening on ${PORT}`));
