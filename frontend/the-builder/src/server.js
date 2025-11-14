import dotenv from 'dotenv';
dotenv.config({path: 'src/.env'});
import express from 'express';
const app = express();
const port = 3001;
import path from 'path';
import cors from 'cors';

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname + '/index.html'))
// });

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cors());

import { MongoClient, ServerApiVersion} from 'mongodb';

let uri =process.env.ATLAS_CONNECTION;

const client = new MongoClient(uri, {
   serverApi: {
    version: ServerApiVersion.v1,
   strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    console.log("We are inside the run function");
    await client.connect();
    const db = client.db("Builder");
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    let ID = await client.db("builder").collection("PlayerBuilds").find({build: "163004021102100080064374043465459"})
    if (ID) {
      return ID;
    } else {
      console.log("Something got fucky");
    }
 } finally {
   await client.close();
  }
}


app.post('/submitMessage', async function(request, response){
    let message = request.body.message;
    console.log("Message: " + message);
    let ID = await run();
    response.send("ID is " + ID._id);
})

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
