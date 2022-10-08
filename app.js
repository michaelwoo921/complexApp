const express = require('express');
const dotenv = require('dotenv')
dotenv.config();

const app = express();


app.get('/', function(req,res){
    res.send('<h1>Test</h1>')
})

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`server running on port ${PORT}`))