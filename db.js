const MongoClient = require('mongodb').MongoClient
const app = require('./app')
require('dotenv').config()

const mongoURI = process.env.mongoURI;

const client = new MongoClient(mongoURI)

client.connect().then(() => {
    console.log('mongo client connected');
    const PORT = process.env.PORT
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))

})

module.exports = client
