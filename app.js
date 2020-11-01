const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config()

const route = require('./routes')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.use(route)

const PORT = process.env.PORT || 3300;
app.listen(PORT, ()=>{
    console.log("SERVER IS RUNNING ON PORT::", PORT);
});