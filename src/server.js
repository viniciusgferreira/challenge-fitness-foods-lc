import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { router } from './api/v1/routes/router.js';
import * as dotenv from 'dotenv';
dotenv.config();

const MONGOHOST = process.env.MONGOHOST;
const MONGOUSER = process.env.MONGOUSER;
const MONGOPASS = process.env.MONGOPASS;
const MONGODB = process.env.MONGODB;
const mongoURI = `mongodb+srv://${MONGOUSER}:${MONGOPASS}@${MONGOHOST}`;
export const mongodbClient = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


await mongodbClient.connect();
console.log('mongodb connected');
const db = mongodbClient.db(MONGODB);
export const collectionProducts = db.collection('products');

// START SERVER
const PORT = process.env.PORT || 3000;
const app = express();

//JSON PARSER
app.use(express.json());

// ROUTER
app.use('/v1', router);

app.listen(PORT, () => console.log(`API Fitness Foods is running on port http://localhost:${PORT}`));
