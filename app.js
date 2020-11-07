const express = require('express');
const app = express();
const consign = require('consign')
const morgan =  require('morgan')
require('dotenv').config()


consign()
.include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)



const PORT = process.env.PORT || 3300;
app.listen(PORT, ()=>{
    console.log("SERVER IS RUNNING ON PORT::", PORT);
});
