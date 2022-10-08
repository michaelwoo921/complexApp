const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

async function start(){
    const client = new MongoClient(process.env.mongoURI)
    await client.connect()
    console.log('mongo client connected');
    module.exports = client
    const PORT = process.env.PORT
    require('./app').listen(PORT, () => console.log(`server running on port ${PORT}`))
}

start()
