const express = require('express');
const functions1 = require('firebase-functions');
const webapp = express();
//const bodyParser = require('body-parser');
//const multer = require('multer');
//const upload = multer();

webapp.get('/auth', (req, res) => res.send('hello auth hello'));

exports.webapp = functions1.https.onRequest(webapp);
exports.fulfillment = require('./fulfillment').fulfillment;