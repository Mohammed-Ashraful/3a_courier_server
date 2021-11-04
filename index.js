const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000;
// middleware
app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wijwg.mongodb.net/courier?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run() {
  try {
    await client.connect();
    console.log('Connected to db');
    const database = client.db('courier');
    const newsCollection = database.collection('news');
    const servicesCollection = database.collection('service')
    const orderCollection = database.collection('order');
  //GET API  Load services data
    app.get('/service', async (req, res) => {
      const cursor = servicesCollection.find({})
      const service = await cursor.toArray();
      res.send(service)
    })
  // GET Single data
    app.get('/service/:id', async (req, res) => {
      const id = req.params.id;
      console.log('id',id);
      const query = { _id: ObjectId(id) }
      const service = await servicesCollection.findOne(query);
      res.json(service)
    })
    //GET API Load news data;
    app.get('/news', async (req, res) => {
      const cursor = newsCollection.find({});
      const news = await cursor.toArray();
      res.send(news)
    })
    // GET ORDER API 
    app.get('/order', async (req, res) => {
      const cursor = orderCollection.find({})
      const order = await cursor.toArray();
      res.send(order)
    })

    //POST API 
    app.post('/service', async (req, res) => {
      const service = req.body;
      const result =await servicesCollection.insertOne(service);
      console.log(result);
      res.json(result)
    })

    //POST Order API 
    app.post('/order', async (req, res) => {
      const order = service = req.body;
      const result = await orderCollection.insertOne(order);
      console.log(result);
      res.json(result);
    })
  }
  finally {
    // client.close();
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send("Welcome to 3A courier service LTD. ")
})
app.listen(port, () => {
  console.log('Listing port is ', port);
})