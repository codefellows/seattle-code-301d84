'use strict';

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

// instaniate express server by calling express()
const app = express();

// USE
app.use(cors());

// define our port & confirm the .env works
const PORT = process.env.PORT || 3002

// ROUTES
app.get('/', (req, res) => {
  res.status(200).send('This works');
});

app.get('/photos', async (req, res, next) => {
  try {
    console.log(req.query.searchQuery);
    let searchQuery = req.query.searchQuery;
    let url = `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${process.env.UNSPLASH_API_KEY}`
    console.log(url);
    let results = await axios.get(url);
    console.log(results.data);
    let picArray = results.data.results.map(pic => new Photo(pic));
    res.status(200).send(picArray);
  } catch (error) {
    next(error);
  }
});

app.get('*', (req, res) => {
  res.status(404).send('These are really not the droids you are looking for...');
});

// CLASSES
class Photo {
  constructor(pic) {
    this.src = pic.urls.regular;
    this.alt = pic.alt_description;
    this.artist = pic.user.name;
  }
}

// ERRORS
app.use((error, req, res, next) => {
  console.log(error.message);
  res.status(500).send(error.message);
});

// LISTEN
// need to listen to keep the server running
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
