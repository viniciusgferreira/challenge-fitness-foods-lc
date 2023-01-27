import { MongoClient, ServerApiVersion } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const MONGOHOST = process.env.MONGOHOST;
const MONGOUSER = process.env.MONGOUSER;
const MONGOPASS = process.env.MONGOPASS;
const mongoURI = `mongodb+srv://${MONGOUSER}:${MONGOPASS}@${MONGOHOST}`;
export const mongodbClient = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
