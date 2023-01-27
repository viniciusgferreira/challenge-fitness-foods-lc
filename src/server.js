import express from 'express';
import { router } from './api/v1/routes/router.js';
import * as dotenv from 'dotenv';
import cron from 'node-cron';
import { MongoClient, ServerApiVersion } from 'mongodb';
import importProducts from './utils/importProducts.js';

dotenv.config();

// CONNECT TO MONGODB
const mongoURI = `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@${process.env.MONGOHOST}`;
export const mongodbClient = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
export const mongodbServerConnection = await mongodbClient.connect();
export const database = mongodbClient.db(process.env.MONGODB);

// START CRON IMPORTER
cron.schedule(process.env.CRON_EXPRESSION, () => {
  importProducts();
});

// START SERVER
const PORT = process.env.PORT || 3000;
const app = express();

//JSON PARSER
app.use(express.json());

// ROUTER
app.use('/v1', router);

app.listen(PORT, () => console.log(`API Fitness Foods is running on http://localhost:${PORT}`));

