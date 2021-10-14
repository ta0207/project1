const Inventory = require('../models/Warehouse.js'); 
const mongoose = require('mongoose');




const updateInventory = async (id, quantity) => {
    const response = await Inventory.updateOne({_id: id}, {$set: {Quantity: quantity}})
}





const viewInventory = async (sector, warehouse) => {
    try {
        const inventory = await Inventory.find({Sector: sector, Warehouse: warehouse });
        inventoryCount(inventory);
        if (inventory == null) {
            throw `No Inventory could be found.`;
        }
        return inventory;
    } catch (err) {
        console.error(err);
    }
}

const inventoryCount = async (sector, warehouse) => {
    try {
        const inventory = await Inventory.find({Sector: sector, Warehouse: warehouse });
        let count = 0;
        for(let i in inventory){
            count += inventory[i].Quantity;
            }
        if (inventory == null) {
            throw `No Inventory could be found.`;
        }
        return inventory;
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    viewInventory,updateInventory
}