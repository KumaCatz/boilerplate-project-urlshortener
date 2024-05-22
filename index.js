require('dotenv').config({ path: 'sample.env' });
const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.DB_URL);
const db = client.db("urlshortener");
const urls = db.collection("urls");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.post('/api/shorturl', function(req, res) {
  console.log(req.body)
  res.json({ original_url : req.body, short_url : 1});
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
