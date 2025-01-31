// import { MongoClient } from "mongodb";

// const client = new MongoClient(process.env.MONGO_URI);
// export async function connectToDatabase() {
//   if (!client.isConnected) await client.connect();
//   return client.db("retirement");
// }

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Your MongoDB URI
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;