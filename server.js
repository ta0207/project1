const express = require('express')
const app = express();
app.use(express.json())
const { resolve } = require('path');
app.use(express.json()); // Automatically Parses JSON data for us
app.use(express.urlencoded({extended: true})); // Allows to parse the encoded Form Data
app.use(express.static('views')); // Sets aside a static assets folder for static content (html/css/js)
app.use('/view', require("./routes/view")); // rout to view 
app.use('/inv', require("./routes/manage")); // rout to inventory management
require('dotenv').config(); // sensitive info
const { auth, requiresAuth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
  };

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.get('/', requiresAuth(), function (req, res, next) {
    res.sendFile(resolve('views','main.html'));
})

//set port for express
app.listen(8084, () => {
    console.log('Listening on 8084!');
});

