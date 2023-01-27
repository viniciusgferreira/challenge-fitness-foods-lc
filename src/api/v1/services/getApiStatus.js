import { mongodbServerConnection } from '../../../server.js';

export async function getApiStatus() {

  const hello = await mongodbServerConnection.db('admin').command({ hello: 1 });
  const last_import = await mongodbServerConnection.db('fitnessfoodsdb').collection('imports').find().sort({ imported_t: -1 }).limit(1).toArray();
  let connection = true;
  if (!hello) { connection = false; }
  const apiStatus = {
    'uptimeSeconds': process.uptime(),
    'mongodbConnection': connection,
    'mongoIsWritable': hello.isWritablePrimary,
    'last_import': last_import,
    'memoryUsageBytes': process.memoryUsage()
  };
  return apiStatus;
}

