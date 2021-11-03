const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');

// PASS: LsSIU2OU98Ow5OXI;
// NAME: courier;

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

    //POST API 
    app.post('/service', async (req, res) => {
      const services = {
        "id": "1",
        "img": "https://i.ibb.co/7vzTfvr/food.jpg",
        "name": "Food aaa delivery",
        "details": "Our food delivery service is so good . All of resturent in dhaka city take delivery from us . And we try to give best service 111111",
        "cost": "5000"
      }
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