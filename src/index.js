import { app } from './server.js';
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API Fitness Foods is running on port:${PORT}`));
