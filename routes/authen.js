const express = require("express");
let router = express.Router();
const { resolve } = require('path');
const bcrypt = require('bcrypt')

const users = [];


router.get('/', (req, res) => {
    res.json(users)
})


router.post('/', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log(hashedPassword)
        const user = {name: req.body.name, password: hashedPassword}
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
})

router.post('/login', async (req, res)=> {
    const user = users.find(user => user.name =req.body.name)
    if (user == null){
        return res.status(400).send('Cannot Find User')
    }
    try {
       if(await bcrypt.compare(req.body.password, user.password)){
           res.send('Success')
       }else{
           res.send('Not Allowed')
       }
    } catch{
        res.status(500).send()
    }
})

module.exports = router;