import express from 'express';
import { router } from './api/v1/routes/router.js';
import * as dotenv from 'dotenv';
import { ConfigApiStatus } from './api/v1/services/getApiStatus.js';
import importProducts from './utils/importProducts.js';

dotenv.config();
ConfigApiStatus();

// START SERVER
const PORT = process.env.PORT || 3000;
const app = express();

//JSON PARSER
app.use(express.json());

// ROUTER
app.use('/v1', router);

app.listen(PORT, () => console.log(`API Fitness Foods is running on http://localhost:${PORT}`));

// CREATE CRON JOB
//importProducts();
