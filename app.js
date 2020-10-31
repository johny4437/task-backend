const express = require('express');
const app = express();
const bodyParser = require('body-parser');



app.use(bodyParser.json())

const PORT = process.env.PORT || 3300;
app.listen(PORT, ()=>{
    console.log("SERVER IS RUNNING ON PORT::", PORT);
});