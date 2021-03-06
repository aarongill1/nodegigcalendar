
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'gigs';
// Create a new MongoClient

const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient(url);
let gigsCollection = {};

   MongoClient.connect(url, function(err, client) {
    if(err) {
      console.log(err)
      throw {error:'Database connection failed'}
     }

     let db = client.db(dbName);
     gigsCollection.gigs = db.collection('gig')
   });

   module.exports = gigsCollection
