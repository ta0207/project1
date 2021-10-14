const express = require("express");
let router = express.Router();
const app = express();
app.use(express.json()); // Automatically Parses JSON data for us
app.use(express.urlencoded({extended: true})); // Allows to parse the encoded Form Data
const mongoose = require('mongoose');
require('dotenv').config();
const Inventory = require('../models/Warehouse.js');
const { viewInventory } = require('../controllers/Inventory.js');


router.get('/?', async (req, res) => {
    let sector = req.query.sector;
    let warehouse = req.query.warehouse;
    try{
        await mongoose.connect(process.env.ATLAS_URI);
        const ret = await viewInventory(sector,warehouse);
        res.send(ret);
    }  catch{
        res.status(500).send("Server Error. Try Again");
    }
})

module.exports = router;