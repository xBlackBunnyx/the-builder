// import dotenv from 'dotenv';
// dotenv.config({path: 'src/.env'});

import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

export function add(n1,n2){
    return n1 +n2;
}

export const pi = 3.14159;

// import { MongoClient, ServerApiVersion} from 'mongodb';

// let uri =process.env.ATLAS_CONNECTION;

// const client = new MongoClient(uri, {
//    serverApi: {
//     version: ServerApiVersion.v1,
//    strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     console.log("We are inside the run function");
//     await client.connect();
//     const db = client.db("Builder");
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     let theID = await client.db("builder").collection("PlayerBuilds").find({build: "163004021102100080064374043465459"})
//  } finally {
//    await client.close();
//   }
// }

app.post('api/testing', async() => {
  try {
    console.log("PING");

  } catch (error) {
    res.status(500).json({success: false, error: error.message});
  }
});

//Start server
async function startServer() {
  await run();
  app.listen(PORT, () => {
  console.log(`Successfully served on port: ${PORT}`);
})
}

startServer();