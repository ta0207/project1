const {Schema, model} = require('mongoose');

/**
 * Inventory Schema to define the behavior and structure of the database
 */
const inventorySchema = new Schema({
    _id: Number,
    Sector: Number,
    Warehouse: Number,
    Material: String,
    Quantity: Number
});

const Inventory = model('inventory', inventorySchema);
module.exports = Inventory;