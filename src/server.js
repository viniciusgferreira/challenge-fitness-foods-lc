
import { MongoClient, ServerApiVersion } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const MONGODB = process.env.MONGODB;
const MONGOUSER = process.env.MONGOUSER;
const MONGOPASS = process.env.MONGOPASS;
const uri = `mongodb+srv://${MONGOUSER}:${MONGOPASS}@${MONGODB}`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

try {
  await client.connect();
  console.log('mongodb connected');
  //await client.db().dropCollection('products');
  const dbs = await client.db().admin().listDatabases();
  console.log(dbs);
} catch (error) {
  console.error(error.message);
}
