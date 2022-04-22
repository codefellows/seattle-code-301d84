'use strict';
const axios = require('axios');

let cache = {};

async function getPhotos(req, res, next) {
  try {
    console.log(req.query.searchQuery);
    let searchQuery = req.query.searchQuery;

    // create a custom key for what the user has searched for
    let key = `${searchQuery.toLowerCase()}Data`;

    // first check if the searchQuery is in the Cache already with data
    // And check how old the data is

    // 1 month is too old:
    let tooOld = 1000 * 60 * 60 * 24 * 30;
    // let testWithThis = 1000 * 30;
    if (cache[key] && (Date.now() - cache[key].timeStamp < tooOld) ) {
      // if there is cached data, use that data
      console.log('It is in the cache.');
      res.status(200).send(cache[key].data);
    } else {
      // if there is not cached, make a request to the api and then put that data in the cache
      console.log('It is not in the cache, so cache it.')
      let url = `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${process.env.UNSPLASH_API_KEY}`
      // console.log(url);
      let results = await axios.get(url);
      // console.log(results.data);
      let picArray = results.data.results.map(pic => new Photo(pic));

      // put data into the cache
      // add a timestamp when I put in the cache
      cache[key] = {
        data: picArray,
        timeStamp: Date.now()
      }
      res.status(200).send(picArray);
    }

    
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
