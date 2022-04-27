'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);
const Cat = require('./models/cat.js');

async function seed() {
  // structure is the same as our Cat Schema:
  // name: {type: String, required: true},
  // color: {type: String, required: true},
  // spayNeuter: {type: Boolean, required: true},
  // location: {type: String, required: true}
  await Cat.create({
    name: 'Harvey',
    color: 'orange tabby',
    spayNeuter: true,
    location: 'Seattle'
  });
  console.log('Harvey was added');

  await Cat.create({
    name: 'Joey',
    color: 'stripped brown and black',
    spayNeuter: true,
    location: 'Los Angeles'
  });
  console.log('Joey was added');
  mongoose.disconnect();
}

seed();
