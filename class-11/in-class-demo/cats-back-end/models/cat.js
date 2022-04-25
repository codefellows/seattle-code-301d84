'use strict';

// bring in mongoose
const mongoose = require('mongoose');

// extracting the schema property from the mongoose object
const { Schema } = mongoose;

// create a cat schema, define how our cat objects will be structured
const catSchema = new Schema({
  name: {type: String, required: true},
  color: {type: String, required: true},
  spayNeuter: {type: Boolean, required: true},
  location: {type: String, required: true}
});

// define our moddel
// this will give it functionality and the predefined schema to shape our data.
// params: a string and a schema
const CatModel = mongoose.model('Cat', catSchema);

module.exports = CatModel;
