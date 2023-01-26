import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { router } from './api/v1/routes/router.js';
import * as dotenv from 'dotenv';
import { ConfigApiStatus } from './api/v1/services/getApiStatus.js';

dotenv.config();

const MONGOHOST = process.env.MONGOHOST;
const MONGOUSER = process.env.MONGOUSER;
const MONGOPASS = process.env.MONGOPASS;
const MONGODB = process.env.MONGODB;
const mongoURI = `mongodb+srv://${MONGOUSER}:${MONGOPASS}@${MONGOHOST}`;
export const mongodbClient = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
ConfigApiStatus();

// CONNECT TO MONGODB
export const mongodbConnection = await mongodbClient.connect();
export const database = mongodbClient.db(MONGODB);
export const collectionProducts = database.collection('products');
export const collectionImport = database.collection('import');

// START SERVER
const PORT = process.env.PORT || 3000;
const app = express();

//JSON PARSER
app.use(express.json());

// ROUTER
app.use('/v1', router);

app.listen(PORT, () => console.log(`API Fitness Foods is running on http://localhost:${PORT}`));
