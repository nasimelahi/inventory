// auth0-config.js

const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// Middleware to validate JWT tokens
const jwtCheck = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://YOUR_AUTH0_DOMAIN/.well-known/jwks.json`,
  }),
  audience: 'YOUR_AUTH0_API_IDENTIFIER',
  issuer: `https://YOUR_AUTH0_DOMAIN/`,
  algorithms: ['RS256'],
});

module.exports = jwtCheck;
