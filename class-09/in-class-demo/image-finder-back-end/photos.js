'use strict';
const axios = require('axios');

async function getPhotos(req, res, next) {
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
    Promise.resolve().then(() => {
      throw new Error(error.message);
    }).catch(next);
  }
}

// CLASSES
class Photo {
  constructor(pic) {
    this.src = pic.urls.regular;
    this.alt = pic.alt_description;
    this.artist = pic.user.name;
  }
}

function getPhotosWithChaining(req, res) {
  let searchQuery = req.query.searchQuery;
  let url = 'https://api.unsplash.com/search/photos';
  let params = {
    client_id: process.env.UNSPLASH_API_KEY,
    query: searchQuery
  }

  axios.get(url, { params })
    .then(PhotoResults => PhotoResults.data.results.map(pic => new Photo(pic)))
    .then(groomedPhotos => res.status(200).send(groomedPhotos))
    .catch(err => console.error(err));
}

module.exports = getPhotos;
