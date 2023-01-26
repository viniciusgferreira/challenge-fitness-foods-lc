import { getApiStatus } from '../services/getApiStatus.js';

export async function controller_getApiStatus(req, res) {
  const apiStatus = await getApiStatus();
  res.json(apiStatus);
}
