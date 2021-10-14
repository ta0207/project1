const express = require("express");
let router = express.Router();
const app = express();
app.use(express.json()); // Automatically Parses JSON data
app.use(express.urlencoded({extended: true})); // Allows to parse the encoded Form Data
const mongoose = require('mongoose');
require('dotenv').config();
const Inventory = require('../models/Warehouse.js');
const { updateInventory,addInventory, deleteInventory } = require('../controllers/Inventory.js');

router.put('/s=1&w=1', async (req, res) => {
    await mongoose.connect(process.env.ATLAS_URI);
    console.log('Connected to database!');
    const ret = await findInventory(1,1);
    res.send(ret);
})

const findInventory = async (sector, warehouse) => {
    try {
        const inventory = await Inventory.find({Sector: sector, Warehouse: warehouse });
        if (inventory == null) {
            throw `No inventory could be found.`;
        }
        return inventory;
    } catch {
        res.status(500).send("Server Error. Try Again");
    }
}

router.post('/add', async (req, res) => {
    try {
        await updateInventory(req.body._id, req.body.Quantity);
        res.status(201).send("Addition Completed")
    } catch {
        res.status(500).send("Server Error. Try Again");
    }
})


router.put('/update', async (req, res) => {
    try {
        await updateInventory(req.body._id, req.body.Quantity);
        res.status(201).send("Update Completed")
    } catch {
        res.status(500).send("Server Error. Try Again");
    }
})

router.delete('/del', async (req, res) => {
    try {
        await updateInventory(req.body._id, req.body.Quantity);
        res.status(201).send("Deletion Completed")
    } catch {
        res.status(500).send("Server Error. Try Again");
    }
})

module.exports = router;

