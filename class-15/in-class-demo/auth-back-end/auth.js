'use strict';

// jwt - JSON web token (jot)
const jwt = require('jsonwebtoken');

// jwks - JSON web key set (pronouced ja-wicks)
const jwksClient = require('jwks-rsa');

// this jwks URL comess from Auth0 acount page
// advanced settings -> endpoints -> 0auth -> JSON Web Key Set
const client = jwksClient({
  jwksUri: process.env.JWKS_URI
});

// I need a getKey function from jsonwebtoke to make things work
// https://www.npmjs.com/package/jsonwebtoken
// search for "auth0"
function getKey(header, callback){
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

// we are verifying the user on our route:
function verifyUser(req, errorFirstOrUserCallbackFunction) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    // from the jsonwebtoken docs:
    jwt.verify(token, getKey, {}, errorFirstOrUserCallbackFunction);
  } catch(error) {
    errorFirstOrUserCallbackFunction('no authorized');
  }
}

module.exports = verifyUser;
