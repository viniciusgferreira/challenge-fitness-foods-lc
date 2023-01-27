import { mongodbServerConnection } from '../../../server.js';

export async function getApiStatus() {

  const hello = await mongodbServerConnection.db('admin').command({ hello: 1 });
  let connection = true;
  if (!hello) { connection = false; }
  const apiStatus = {
    'uptimeSeconds': process.uptime(),
    'memoryUsageBytes': process.memoryUsage(),
    'mongodbConnection': connection,
    'mongoIsWritable': hello.isWritablePrimary,
  };
  return apiStatus;
}

