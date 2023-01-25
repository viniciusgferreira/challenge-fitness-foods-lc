import { isConnected } from '../../../server.js';

export async function controller_getApiStatus(req, res) {
  const status = isConnected;
  const apiStatus = { 'mongodbConnected': status };
  res.json(apiStatus);
}
