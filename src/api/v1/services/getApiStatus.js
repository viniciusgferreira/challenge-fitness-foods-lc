import { mongodbClient } from './../../../utils/mongodbUtil.js';

// SAVE CONNECTION STATUS (isConnected not available anymore)
let isConnected;
export function ConfigApiStatus() {

  mongodbClient.on('connectionCreated', () => {
    console.log('mongodb connected');
    isConnected = true;
  });

  mongodbClient.on('connectionClosed', () => {
    console.log('mongodb disconnected');
    isConnected = false;
  });
}

export async function getApiStatus() {

  const hello = await mongodbClient.db('admin').command({ hello: 1 });
  const apiStatus = {
    'uptimeSeconds': process.uptime(),
    'memoryUsageBytes': process.memoryUsage(),
    'mongodbConnection': isConnected,
    'mongoIsWritable': hello.isWritablePrimary,
  };
  return apiStatus;
}

