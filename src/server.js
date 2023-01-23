import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { router } from './routes/router.js';
import * as dotenv from 'dotenv';
dotenv.config();

const MONGODB = process.env.MONGODB;
const MONGOUSER = process.env.MONGOUSER;
const MONGOPASS = process.env.MONGOPASS;
const uri = `mongodb+srv://${MONGOUSER}:${MONGOPASS}@${MONGODB}`;
export const mongodbClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

try {
  await mongodbClient.connect();
  console.log('mongodb connected');

  // START SERVER
  const PORT = process.env.PORT || 3000;
  const app = express();

  //JSON PARSER
  app.use(express.json());

  // ROUTER
  app.use('/v1', router);

  app.listen(PORT, () => console.log(`API Fitness Foods Products is running on port http://localhost:${PORT}`));


} catch (error) {
  console.error(error.message);
}
