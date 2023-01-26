import { MongoClient, ServerApiVersion } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const MONGOHOST = process.env.MONGOHOST;
const MONGOUSER = process.env.MONGOUSER;
const MONGOPASS = process.env.MONGOPASS;
const MONGODB = process.env.MONGODB;
const mongoURI = `mongodb+srv://${MONGOUSER}:${MONGOPASS}@${MONGOHOST}`;
export const mongodbClient = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// CONNECT TO MONGODB
export const mongodbConnection = await mongodbClient.connect();
export const database = mongodbClient.db(MONGODB);
export const collectionProducts = database.collection('products');
export const collectionImport = database.collection('imports');
