const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
 // pass = YSXp8Qnt4ZLd1EZu

const uri = "mongodb+srv://organicUser:YSXp8Qnt4ZLd1EZu@cluster0.ier7s.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html');
})

// ---------- Mongodb ---------- 

client.connect(err => {
  const collection = client.db("organicdb").collection("products");

  app.get('/products', (req, res) => {
      collection.find({})
      .toArray((err , documents => {
          res.send(documents);
      }))
  })

  app.post("/addProduct" , (req, res) =>{
    const product = req.body;
    collection.insertOne(product)
    .then (result => {
        console.log("Data added successfully");
        res.send('Success');
    })
  })
  })

  console.log('Database connected');

// ---------- Mongodb ----------

app.listen(2121,()=> console.log('listening to port 2121'));