const express = require('express')
const app = express();
app.use(express.json())
const { resolve } = require('path');
app.use(express.json()); // Automatically Parses JSON data for us
app.use(express.urlencoded({extended: true})); // Allows to parse the encoded Form Data
app.use(express.static('views')); // Sets aside a static assets folder for static content (html/css/js)
app.use('/authen', require("./routes/authen")); //rout to authentication
app.use('/view', require("./routes/view")); // rout to view 
app.use('/inv', require("./routes/manage")); // rout to inventory management
require('dotenv').config(); // sensitive info


//end point to homepage
app.get('/', (req, res) => {
    res.sendFile(resolve('views','index.html'));
}); 




//set port for express
app.listen(8084, () => {
    console.log('Listening on 8084!');
});

// app.get('/', (req, res) => {
//     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
//   });
